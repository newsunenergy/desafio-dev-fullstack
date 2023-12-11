import { LoadUnitRepository } from '@/data/protocols/db/unit/load-units-repository'
import prisma from './client'

export class UnitPrismaRepository implements LoadUnitRepository {
  async load (params: LoadUnitRepository.Params): Promise<LoadUnitRepository.Result> {
    return await prisma.unit.findMany({
      where: {
        codigoDaUnidadeConsumidora: { in: params.codigoDeUnidadesConsumidoras }
      },
      include: {
        historicoDeConsumoEmKWH: true
      }
    })
  }
}
