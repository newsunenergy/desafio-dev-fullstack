import { AddLeadRepository } from '@/data/protocols/db/lead/add-lead-repository'
import prisma from './client'
import { LoadLeadRepository } from '@/data/protocols/db/lead/load-lead-repository'

export class LeadPrismaRepository implements AddLeadRepository, LoadLeadRepository {
  async add ({ unidades, ...params }: AddLeadRepository.Params): Promise<void> {
    await prisma.lead.create({
      data: {
        ...params,
        unidades: {
          createMany: {
            data: unidades
          }
        }
      }
    })
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
}
