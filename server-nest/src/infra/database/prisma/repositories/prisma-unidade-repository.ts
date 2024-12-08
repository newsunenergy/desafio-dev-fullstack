import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { UnidadeRepository } from '@application/repositories/unidade-repository';
import { Unidade } from '@application/entities/unidade';

@Injectable()
export class PrismaUnidadeRepository implements UnidadeRepository {
  constructor(private prismaService: PrismaService) {}

  async create(unidade: Unidade): Promise<void> {
    await this.prismaService.unidade.create({
      data: {
        id: unidade.id,
        codigoDaUnidadeConsumidora: unidade.codigoDaUnidadeConsumidora,
        modeloFasico: unidade.modeloFasico,
        enquadramento: unidade.enquadramento,
        leadId: unidade.leadId,
      },
    });
  }
}
