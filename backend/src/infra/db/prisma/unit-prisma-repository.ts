import { LoadUnitRepository } from '@/data/protocols/db/unit/load-units-repository'
import prisma from './client'

export class UnitPrismaRepository implements LoadUnitRepository {
  async load (params: LoadUnitRepository.Params): Promise<LoadUnitRepository.Result> {
    return await prisma.unit.findMany({
      where: {
        codigoDaUnidadeConsumidora: { in: params.codigoDeUnidadesConsumidoras },
        leadId: params.leadId,
        Lead: {
          email: params.leadEmail,
          phone: params.leadPhone,
          name: params.leadName
        }
      },
      include: {
        historicoDeConsumoEmKWH: true
      }
    })
  }
}
