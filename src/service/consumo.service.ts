import { BadRequestException, Injectable } from '@nestjs/common'
import { Consumo } from '@prisma/client'
import { PrismaService } from 'src/infra/prisma/prisma.service'

@Injectable()
export class ConsumoService {
  constructor(private readonly prisma: PrismaService) {}
  async createManyConsumo(consumo: Consumo[]) {
    console.log(consumo)
    console.log(consumo.length)
    console.log(consumo[0])
    if (consumo.length != 12) {
      return new BadRequestException(
        'O documento deve conter o histórico de consumo dos ultimos 12 meses!',
      )
    }
    const response = await this.prisma.consumo.createMany({
      data: consumo,
    })
    return response
  }
}
