import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateLeadDto } from './dto/create-lead.dto';

@Injectable()
export class LeadService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createLeadDto: CreateLeadDto) {
    const { nomeCompleto, email, telefone, unidades } = createLeadDto;

    if (!createLeadDto.unidades || createLeadDto.unidades.length === 0) {
      throw new BadRequestException('Um lead deve ter pelo menos uma unidade.');
    }

    createLeadDto.unidades.forEach((unidade) => {
      if (unidade.historicoDeConsumoEmKWH.length !== 12) {
        throw new BadRequestException(
          `A unidade ${unidade.codigoDaUnidadeConsumidora} deve ter exatamente 12 registros no histórico de consumo.`,
        );
      }
    });

    const prismaFormattedUnidades = unidades.map((unidade) => ({
      codigoDaUnidadeConsumidora: unidade.codigoDaUnidadeConsumidora,
      modeloFasico: unidade.modeloFasico,
      enquadramento: unidade.enquadramento,
      historicoDeConsumoEmKWH: {
        create: unidade.historicoDeConsumoEmKWH.map((consumo) => ({
          consumoForaPontaEmKWH: consumo.consumoForaPontaEmKWH,
          mesDoConsumo: consumo.mesDoConsumo.toString(),
        })),
      },
    }));

    try {
      return await this.databaseService.lead.create({
        data: {
          nomeCompleto,
          email,
          telefone,
          unidades: {
            create: prismaFormattedUnidades,
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email ou código da unidade já existe.');
      }
      throw new InternalServerErrorException('Erro ao criar o lead.');
    }
  }

  async findAll(filters?: {
    nome?: string;
    email?: string;
    codigoDaUnidadeConsumidora?: string;
  }) {
    return this.databaseService.lead.findMany({
      where: {
        AND: [
          filters?.nome ? { nomeCompleto: { contains: filters.nome } } : {},
          filters?.email ? { email: { equals: filters.email } } : {},
          filters?.codigoDaUnidadeConsumidora
            ? {
                unidades: {
                  some: {
                    codigoDaUnidadeConsumidora:
                      filters.codigoDaUnidadeConsumidora,
                  },
                },
              }
            : {},
        ],
      },
      include: {
        unidades: {
          include: {
            historicoDeConsumoEmKWH: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const lead = await this.databaseService.lead.findUnique({
      where: { id },
      include: {
        unidades: {
          include: {
            historicoDeConsumoEmKWH: true,
          },
        },
      },
    });
    if (!lead) {
      throw new NotFoundException(`Lead com o ID ${id} não foi encontrado.`);
    }
    return lead;
  }

  async remove(id: string) {
    await this.databaseService.consumo.deleteMany({
      where: {
        unidade: {
          leadId: id,
        },
      },
    });

    await this.databaseService.unidade.deleteMany({
      where: {
        leadId: id,
      },
    });

    return this.databaseService.lead.delete({
      where: { id },
    });
  }
}
