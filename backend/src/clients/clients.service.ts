/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Consumo } from '@prisma/client';
import { IClient, ILeadFilters } from './clients.interface';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async createLead(data: IClient): Promise<IClient> {
    try {
      const checkClient = await this.prisma.client.findUnique({
        where: { email: data.email },
      });

      if (checkClient) {
        throw new BadRequestException(
          `O e-mail ${data.email} já está cadastrado.`,
        );
      }
      if (data.unidades) {
        for (const unidade of data.unidades) {
          const existingUnit = await this.prisma.unidade.findUnique({
            where: {
              codigoDaUnidadeConsumidora: unidade.codigoDaUnidadeConsumidora,
            },
          });

          if (existingUnit) {
            throw new BadRequestException(
              `A unidade consumidora ${unidade.codigoDaUnidadeConsumidora} já está cadastrada.`,
            );
          }
        }
      }

      return await this.prisma.client.create({
        data: {
          nome: data.nome,
          email: data.email,
          telefone: data.telefone,
          unidades: {
            create: data.unidades?.map((unidade) => ({
              clientId: unidade.clientId,
              codigoDaUnidadeConsumidora:
                unidade.codigoDaUnidadeConsumidora ?? '',
              modeloFasico: unidade.modeloFasico,
              enquadramento: unidade.enquadramento,
              historicoDeConsumoEmKWH: {
                create: unidade.historicoDeConsumoEmKWH.map(
                  (consumo: Consumo) => ({
                    consumoForaPontaEmKWH: consumo.consumoForaPontaEmKWH,
                    mesDoConsumo: isNaN(
                      new Date(consumo.mesDoConsumo).getTime(),
                    )
                      ? new Date()
                      : new Date(consumo.mesDoConsumo),
                  }),
                ),
              },
            })),
          },
        },
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao criar lead.', error);
    }
  }

  async getAllClients({
    page,
    limit,
    filters,
  }: {
    page: number;
    limit: number;
    filters: ILeadFilters;
  }) {
    const skip = (page - 1) * limit;
    const where: any = {};

    if (filters?.search) {
      where.OR = [
        { nome: { contains: filters.search } },
        { email: { contains: filters.search } },
        {
          unidades: {
            some: { codigoDaUnidadeConsumidora: { contains: filters.search } },
          },
        },
      ];
    }

    if (filters?.filter) {
      where.unidades = {
        some: {
          modeloFasico: filters.filter,
        },
      };
    }

    const total = await this.prisma.client.count({ where });

    const clients = await this.prisma.client.findMany({
      where,
      skip,
      take: limit,
      include: {
        unidades: {
          include: {
            historicoDeConsumoEmKWH: true,
          },
        },
      },
    });

    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: clients,
    };
  }
  async getLeadById(id: string) {
    return await this.prisma.client.findUnique({
      where: { id },
      include: { unidades: { include: { historicoDeConsumoEmKWH: true } } },
    });
  }
}
