import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import FormData from 'form-data';

const MODELOS_FASICOS_VALIDOS = ['monofasico', 'bifasico', 'trifasico'] as const;
const ENQUADRAMENTOS_VALIDOS = ['AX', 'B1', 'B2', 'B3'] as const;

type ModeloFasico = typeof MODELOS_FASICOS_VALIDOS[number];
type Enquadramento = typeof ENQUADRAMENTOS_VALIDOS[number];

@Injectable()
export class LeadsService {
  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
  ) {}

  private validarModeloFasico(value: string): ModeloFasico {
    const normalized = value.toLowerCase().trim();
    if (!MODELOS_FASICOS_VALIDOS.includes(normalized as any)) {
      throw new BadRequestException(
        `Modelo fásico inválido: "${value}". Valores permitidos: ${MODELOS_FASICOS_VALIDOS.join(', ')}`,
      );
    }
    return normalized as ModeloFasico;
  }

  private validarEnquadramento(value: string): Enquadramento {
    const upper = value.toUpperCase().trim();
    if (!ENQUADRAMENTOS_VALIDOS.includes(upper as any)) {
      throw new BadRequestException(
        `Enquadramento inválido: "${value}". Valores permitidos: ${ENQUADRAMENTOS_VALIDOS.join(', ')}`,
      );
    }
    return upper as Enquadramento;
  }

  async criarSimulacao(dto: any) {
    const { nomeCompleto, email, telefone, faturas } = dto;

    
    if (!nomeCompleto || !email || !telefone || !faturas || faturas.length === 0) {
      throw new BadRequestException('Todos os campos são obrigatórios e pelo menos uma fatura');
    }

    
    const existingLead = await this.prisma.lead.findUnique({ where: { email } });
    if (existingLead) {
      throw new BadRequestException('E-mail já cadastrado');
    }

    const lead = await this.prisma.lead.create({
      data: { nomeCompleto, email, telefone },
    });

    
    for (const file of faturas) {
      const form = new FormData();
      form.append('file', file.buffer, file.originalname);

      const response = await firstValueFrom(
        this.httpService.post('https://magic-pdf.solarium.newsun.energy/v1/magic-pdf', form, {
          headers: form.getHeaders(),
        }),
      );

      const data = response.data;

      
      if (!data.unit_key) {
        throw new BadRequestException('Fatura não contém código da unidade consumidora (unit_key)');
      }

      if (!data.history || !Array.isArray(data.history) || data.history.length !== 12) {
        throw new BadRequestException('A fatura deve conter exatamente 12 meses de histórico de consumo');
      }

      
      const ucExistente = await this.prisma.unidade.findUnique({
        where: { codigoDaUnidadeConsumidora: data.unit_key },
      });
      if (ucExistente) {
        throw new BadRequestException(`Unidade consumidora ${data.unit_key} já cadastrada em outro lead`);
      }

      
      const modeloFasico = this.validarModeloFasico(data.phaseModel || 'monofásico');
      const enquadramento = this.validarEnquadramento(data.chargingModel || 'B1');

      await this.prisma.unidade.create({
        data: {
          leadId: lead.id,
          codigoDaUnidadeConsumidora: data.unit_key,
          modeloFasico,
          enquadramento,
          historicoDeConsumo: {
            create: data.history.map((h: any) => ({
              consumoForaPontaEmKWH: Number(h.consumo_fp) || 0,
              mesDoConsumo: new Date(h.consumo_date),
            })),
          },
        },
      });
    }

    
    return this.prisma.lead.findUnique({
      where: { id: lead.id },
      include: {
        unidades: {
          include: { historicoDeConsumo: true },
          orderBy: { codigoDaUnidadeConsumidora: 'asc' },
        },
      },
    });
  }

  async listar(filtro?: string) {
    const where = filtro ? {
      OR: [
        { nomeCompleto: { contains: filtro } },
        { email: { contains: filtro } },
        { unidades: { some: { codigoDaUnidadeConsumidora: { contains: filtro } } } },
      ],
    } : {};

    return this.prisma.lead.findMany({
      where,
      include: { unidades: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async buscarPorId(id: string) {
    return this.prisma.lead.findUnique({
      where: { id },
      include: { unidades: { include: { historicoDeConsumo: true } } },
    });
  }
}