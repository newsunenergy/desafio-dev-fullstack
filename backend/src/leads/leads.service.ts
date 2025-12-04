import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import FormData from 'form-data';

@Injectable()
export class LeadsService {
  constructor(private prisma: PrismaService, private httpService: HttpService) {}

  async criarSimulacao(dto: any) {
    const { nomeCompleto, email, telefone, faturas } = dto;

    
    const existingLead = await this.prisma.lead.findUnique({ where: { email } });
    if (existingLead) throw new BadRequestException('E-mail já cadastrado');

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
      if (!data.unit_key || !data.history || data.history.length !== 12) {
        throw new BadRequestException('Fatura inválida: historico deve ter exatamente 12 meses');
      }

      
      const existingUC = await this.prisma.unidade.findUnique({ where: { codigoDaUnidadeConsumidora: data.unit_key } });
      if (existingUC) throw new BadRequestException('Código da unidade consumidora já cadastrado');

      await this.prisma.unidade.create({
        data: {
          leadId: lead.id,
          codigoDaUnidadeConsumidora: data.unit_key,
          modeloFasico: data.phaseModel?.toLowerCase() || 'monofasico',
          enquadramento: data.chargingModel || 'B1',
          historicoDeConsumo: {
            create: data.history.map((h: any) => ({
              consumoForaPontaEmKWH: h.consumo_fp,
              mesDoConsumo: new Date(h.consumo_date),
            })),
          },
        },
      });
    }

    return this.prisma.lead.findUnique({
      where: { id: lead.id },
      include: { unidades: { include: { historicoDeConsumo: true } } },
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