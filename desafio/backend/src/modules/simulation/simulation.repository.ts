import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Consumo, Lead, Unidade } from '@prisma/client';
import { EnergyData, QueryListaSimulacoesDto } from './simulation.dto';

@Injectable()
export class SimulationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Lead | null> {
    return this.prisma.lead.findUnique({
      where: { id },
      include: {
        unidades: {
          include: { historicoDeConsumoEmKWH: true },
        },
      },
    });
  }

  async findByEmail(email: string): Promise<Lead | null> {
    return this.prisma.lead.findUnique({ where: { email } });
  }

  async findByUnitKey(unit_key: string): Promise<Unidade | null> {
    return this.prisma.unidade.findUnique({
      where: { codigoDaUnidadeConsumidora: unit_key },
    });
  }

  async lastConsumptionRegistered(unit_key: string): Promise<Consumo | null> {
    return await this.prisma.consumo.findFirst({
      where: { unidade: { codigoDaUnidadeConsumidora: unit_key } },
      orderBy: { mesDoConsumo: 'desc' },
    });
  }

  async createUnitWithLeadExistent(
    leadId: string,
    unidade: any,
  ): Promise<Unidade> {
    return await this.prisma.unidade.create({
      data: {
        leadId: leadId,
        codigoDaUnidadeConsumidora: unidade.unit_key,
        modeloFasico: unidade.phaseModel,
        enquadramento: unidade.chargingModel,
        historicoDeConsumoEmKWH: {
          create: unidade.invoice.map((invoice: any) => ({
            consumoForaPontaEmKWH: invoice.consumo_fp,
            mesDoConsumo: new Date(invoice.consumo_date),
          })),
        },
      },
    });
  }

  async createLeadWithUnit(
    nomeCompleto: string,
    email: string,
    telefone: string,
    unidade: any,
  ): Promise<Lead> {
    return this.prisma.lead.create({
      data: {
        nomeCompleto,
        email,
        telefone,
        unidades: {
          create: {
            codigoDaUnidadeConsumidora: unidade.unit_key,
            modeloFasico: unidade.phaseModel,
            enquadramento: unidade.chargingModel,
            historicoDeConsumoEmKWH: {
              create: unidade.invoice.map((invoice: any) => ({
                consumoForaPontaEmKWH: invoice.consumo_fp,
                mesDoConsumo: new Date(invoice.consumo_date),
              })),
            },
          },
        },
      },
    });
  }

  async findLeads(query: QueryListaSimulacoesDto): Promise<Unidade[]> {
    const { busca } = query;

    const whereClause: any = {};

    if (busca) {
      whereClause.OR = [
        {
          codigoDaUnidadeConsumidora: {
            contains: busca,
          },
        },
        {
          lead: {
            nomeCompleto: {
              contains: busca,
            },
          },
        },
        {
          lead: {
            email: {
              contains: busca,
            },
          },
        },
      ];
    }

    return this.prisma.unidade.findMany({
      where: whereClause,
      include: {
        lead: true,
        historicoDeConsumoEmKWH: true,
      },
    });
  }

  async updateUnitWithConsumption(data: EnergyData): Promise<Unidade> {
    return await this.prisma.unidade.update({
      where: { codigoDaUnidadeConsumidora: data.unit_key },
      data: {
        modeloFasico: data.phaseModel,
        enquadramento: data.chargingModel,
        historicoDeConsumoEmKWH: {
          deleteMany: {},
          create: data.invoice.map((invoice: any) => ({
            consumoForaPontaEmKWH: invoice.consumo_fp,
            mesDoConsumo: new Date(invoice.consumo_date),
          })),
        },
      },
    });
  }
}
