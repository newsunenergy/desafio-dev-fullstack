import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import {
  ILeadRepository,
  FiltrosSimulacao,
} from '../../domain/repositories/lead.repository.interface';
import { Lead } from '../../domain/entities/lead.entity';
import {
  Unidade,
  ModeloFasico,
  Enquadramento,
} from '../../domain/entities/unidade.entity';
import { Consumo } from '../../domain/entities/consumo.entity';

@Injectable()
export class PrismaLeadRepository implements ILeadRepository {
  constructor(private prisma: PrismaService) {}

  async criar(lead: Lead): Promise<Lead> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const leadCriado = await this.prisma.lead.create({
      data: {
        id: lead.id,
        nomeCompleto: lead.nomeCompleto,
        email: lead.email,
        telefone: lead.telefone,
        unidades: {
          create: lead.unidades.map((unidade) => ({
            id: unidade.id,
            codigoDaUnidadeConsumidora: unidade.codigoDaUnidadeConsumidora,
            modeloFasico: unidade.modeloFasico,
            enquadramento: unidade.enquadramento,
            consumos: {
              create: unidade.historicoDeConsumoEmKWH.map((consumo) => ({
                id: consumo.id,
                consumoForaPontaEmKWH: consumo.consumoForaPontaEmKWH,
                mesDoConsumo: consumo.mesDoConsumo,
              })),
            },
          })),
        },
      },
      include: {
        unidades: {
          include: {
            consumos: true,
          },
        },
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.mapToDomain(leadCriado);
  }

  async buscarPorId(id: string): Promise<Lead | null> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const lead = await this.prisma.lead.findUnique({
      where: { id },
      include: {
        unidades: {
          include: {
            consumos: {
              orderBy: {
                mesDoConsumo: 'asc',
              },
            },
          },
        },
      },
    });

    if (!lead) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.mapToDomain(lead);
  }

  async listar(filtros?: FiltrosSimulacao): Promise<Lead[]> {
    const where: Record<string, unknown> = {};

    if (filtros?.nome) {
      where.nomeCompleto = {
        contains: filtros.nome,
      };
    }

    if (filtros?.email) {
      where.email = {
        equals: filtros.email,
      };
    }

    if (filtros?.codigoUnidade) {
      where.unidades = {
        some: {
          codigoDaUnidadeConsumidora: {
            equals: filtros.codigoUnidade,
          },
        },
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const leads = await this.prisma.lead.findMany({
      where,
      include: {
        unidades: {
          include: {
            consumos: {
              orderBy: {
                mesDoConsumo: 'asc',
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
    return leads.map((lead) => this.mapToDomain(lead));
  }

  async buscarPorEmail(email: string): Promise<Lead | null> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const lead = await this.prisma.lead.findUnique({
      where: { email },
      include: {
        unidades: {
          include: {
            consumos: {
              orderBy: {
                mesDoConsumo: 'asc',
              },
            },
          },
        },
      },
    });

    if (!lead) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.mapToDomain(lead);
  }

  async buscarPorCodigoUnidade(codigo: string): Promise<Lead | null> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const unidade = await this.prisma.unidade.findUnique({
      where: { codigoDaUnidadeConsumidora: codigo },
      include: {
        lead: {
          include: {
            unidades: {
              include: {
                consumos: {
                  orderBy: {
                    mesDoConsumo: 'asc',
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!unidade) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.mapToDomain(unidade.lead);
  }

  private mapToDomain(lead: {
    id: string;
    nomeCompleto: string;
    email: string;
    telefone: string;
    unidades: Array<{
      id: string;
      codigoDaUnidadeConsumidora: string;
      modeloFasico: string;
      enquadramento: string;
      consumos: Array<{
        id: string;
        consumoForaPontaEmKWH: number;
        mesDoConsumo: Date;
      }>;
    }>;
  }): Lead {
    const unidades = lead.unidades.map(
      (unidade) =>
        new Unidade(
          unidade.id,
          unidade.codigoDaUnidadeConsumidora,
          unidade.modeloFasico as ModeloFasico,
          unidade.enquadramento as Enquadramento,
          unidade.consumos.map(
            (consumo) =>
              new Consumo(
                consumo.id,
                consumo.consumoForaPontaEmKWH,
                consumo.mesDoConsumo,
              ),
          ),
        ),
    );

    return new Lead(
      lead.id,
      lead.nomeCompleto,
      lead.email,
      lead.telefone,
      unidades,
    );
  }
}
