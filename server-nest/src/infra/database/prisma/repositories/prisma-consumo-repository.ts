import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { ConsumoRepository } from '@application/repositories/consumo-repository';
import { Consumo } from '@application/entities/consumo';

@Injectable()
export class PrismaConsumoRepository implements ConsumoRepository {
  constructor(private prismaService: PrismaService) {}

  async create(consumos: Consumo[]): Promise<void> {
    const consumosData = consumos.map((consumo) => ({
      id: consumo.id,
      mesDoConsumo: consumo.mesDoConsumo,
      consumoForaPontaEmKWH: consumo.consumoForaPontaEmKWH,
      unidadeId: consumo.unidadeId,
    }));

    await this.prismaService.consumo.createMany({
      data: consumosData,
    });
  }
}
