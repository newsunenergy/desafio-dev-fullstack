import { BadRequestException, Injectable } from '@nestjs/common';
import { Lead, Simulacao, Unidade } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSimulacaoDto } from './dto/create-simulacao.dto';
import { UnidadeDto } from './dto/unidade.dto';
import { ConsumoDto } from './dto/consumo.dto';

@Injectable()
export class SimulacaoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Simulacao[] | null> {
    return await this.prisma.simulacao.findMany({
      include: {
        lead: true,
        unidades: {
          include: {
            unidade: true,
          },
        },
      },
    });
  }

  async findById(id: string): Promise<Simulacao | null> {
    return await this.prisma.simulacao.findFirst({
      where: { id },
      include: {
        lead: true,
        unidades: {
          include: {
            unidade: {
              include: {
                historicoDeConsumoEmKWH: true,
              },
            },
          },
        },
      },
    });
  }

  async create(
    simulacao: CreateSimulacaoDto,
    unidade: UnidadeDto,
    consumo: ConsumoDto[],
  ): Promise<{ lead: Lead; unidade: Unidade; simulacao: Simulacao }> {
    return this.prisma.$transaction(async (transaction) => {
      let lead = await transaction.lead.findUnique({
        where: { email: simulacao.email },
      });

      if (!lead) {
        lead = await transaction.lead.create({
          data: { ...simulacao },
        });
      }

      const unidadeExistente = await transaction.unidade.findUnique({
        where: {
          codigoDaUnidadeConsumidora: unidade.codigoDaUnidadeConsumidora,
        },
      });

      if (unidadeExistente) {
        throw new BadRequestException(
          `A unidade com o código ${unidade.codigoDaUnidadeConsumidora} já existe no banco!`,
        );
      }
      const novaUnidade = await transaction.unidade.create({
        data: {
          ...unidade,
          lead: { connect: { id: lead.id } },
          historicoDeConsumoEmKWH: {
            create: consumo.map((c) => ({
              consumoForaPontaEmKWH: c.consumoForaPontaEmKWH,
              mesDoConsumo: c.mesDoConsumo,
            })),
          },
        },
      });

      const novaSimulacao = await transaction.simulacao.create({
        data: {
          lead: { connect: { id: lead.id } },
          unidades: {
            create: [{ unidade: { connect: { id: novaUnidade.id } } }],
          },
        },
      });

      return { lead, unidade: novaUnidade, simulacao: novaSimulacao };
    });
  }
}
