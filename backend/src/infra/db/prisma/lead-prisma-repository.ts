import { AddLeadRepository } from '@/data/protocols/db/lead/add-lead-repository'
import prisma from './client'

export class LeadPrismaRepository implements AddLeadRepository {
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
}
