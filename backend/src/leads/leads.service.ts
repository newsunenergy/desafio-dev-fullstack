import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import FormData from 'form-data';

@Injectable()
export class LeadsService {
  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
  ) {}

  async criarSimulacao(dto: any) {
    const { nomeCompleto, email, telefone, faturas } = dto;

    // Validações básicas
    if (!faturas || faturas.length === 0) throw new BadRequestException('Pelo menos uma fatura é obrigatória');

    const lead = await this.prisma.lead.create({
      data: {
        nomeCompleto,
        email,
        telefone,
        unidades: { create: [] },
      },
    });

    for (const file of faturas) {
      const form = new FormData();
      form.append('file', file.buffer, file.originalname);

      const response = await firstValueFrom(
        this.httpService.post(
          'https://magic-pdf.solarium.newsun.energy/v1/magic-pdf',
          form,
          { headers: form.getHeaders() },
        ),
      );

      const data = response.data;

      if (!data.unit_key || !data.history || data.history.length !== 12) {
        throw new BadRequestException('Fatura inválida ou histórico incompleto');
      }

      await this.prisma.unidade.create({
        data: {
          leadId: lead.id,
          codigoDaUnidadeConsumidora: data.unit_key,
          modeloFasico: data.phaseModel.toLowerCase(),
          enquadramento: data.chargingModel,
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

  async listar(filters: any) {
    return this.prisma.lead.findMany({
      where: filters,
      include: { unidades: true },
    });
  }

  async buscarPorId(id: string) {
    return this.prisma.lead.findUnique({
      where: { id },
      include: { unidades: { include: { historicoDeConsumo: true } } },
    });
  }
}