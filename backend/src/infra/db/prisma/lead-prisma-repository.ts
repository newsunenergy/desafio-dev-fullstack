import { AddLeadRepository } from '@/data/protocols/db/lead/add-lead-repository'
import prisma from './client'
import { LoadLeadRepository } from '@/data/protocols/db/lead/load-lead-repository'
import { LoadLeadByIdRepository } from '@/data/protocols/db/lead/load-lead-by-id'

export class LeadPrismaRepository implements AddLeadRepository, LoadLeadRepository, LoadLeadByIdRepository {
  async add ({ unidades, ...params }: AddLeadRepository.Params): Promise<void> {
    const createdLead = await prisma.lead.create({
      data: {
        ...params,
        unidades: {
          createMany: {
            data: unidades.map((unit) => ({
              modeloFasico: unit.modeloFasico,
              enquadramento: unit.enquadramento,
              codigoDaUnidadeConsumidora: unit.codigoDaUnidadeConsumidora
            }))
          }
        }
      },
      select: {
        unidades: true
      }
    })
    for (const unit of unidades) {
      console.log('🚀🔴  unit:', unit.historicoDeConsumoEmKWH)
      let i = 0
      const createMany = unit.historicoDeConsumoEmKWH.map(unidade => ({
        ...unidade,
        unitId: createdLead.unidades[i].id
      }))
      await prisma.consumo.createMany({
        data: [
          ...createMany
        ]
      })
      i++
    }
  };

  async load (params: LoadLeadRepository.Params): Promise<LoadLeadRepository.Result> {
    const lead = await prisma.lead.findMany({
      where: {
        ...params
      },
      include: {
        unidades: {
          include: {
            historicoDeConsumoEmKWH: true
          }
        }
      }
    })
    return lead
  }

  async loadById (params: LoadLeadByIdRepository.Params): Promise<LoadLeadByIdRepository.Result> {
    return await prisma.lead.findFirst({
      where: {
        id: params.id
      },
      include: {
        unidades: {
          include: {
            historicoDeConsumoEmKWH: true
          }
        }
      }
    })
  }
}
