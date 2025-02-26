import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/providers'
import { ConsumosContract } from './consumos.contract'
import { Consumo } from '@prisma/client'
import { ConsumosEntity } from './consumos.entity'

@Injectable()
export class ConsumosRepository implements ConsumosContract {
  constructor(private readonly prisma: PrismaService) {}

  async createManyConsumos(
    params: ConsumosEntity['createManyConsumos'],
  ): Promise<number> {
    return this.prisma.consumo
      .createMany({
        data: params.data,
      })
      .then((res) => res.count)
  }
}
