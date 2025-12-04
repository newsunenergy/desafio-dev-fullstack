import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/providers'
import { UnidadesContract } from './unidades.contract'
import { Unidade } from '@prisma/client'
import { UnidadesEntity } from './unidades.entity'

@Injectable()
export class UnidadesRepository implements UnidadesContract {
  constructor(private readonly prisma: PrismaService) {}

  createUnidade(params: UnidadesEntity['create']): Promise<Unidade> {
    return this.prisma.unidade.create({ data: params.data })
  }

}
