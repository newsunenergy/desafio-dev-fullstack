import { Injectable } from '@nestjs/common'
import { Unidade } from '@prisma/client'
import { PrismaService } from 'src/infra/prisma/prisma.service'

@Injectable()
export class UnidadeService {
  constructor(private readonly prisma: PrismaService) {}
  async createUnidade(unit: Unidade) {
    const response = await this.prisma.unidade.create({
      data: unit,
    })
    return response
  }

  async getByUnitKey(key: string) {
    return await this.prisma.unidade.findUnique({
      where: {
        codigoDaUnidadeConsumidora: key,
      },
      include: {
        historicoDeConsumoEmKWH: true,
      },
    })
  }
}
