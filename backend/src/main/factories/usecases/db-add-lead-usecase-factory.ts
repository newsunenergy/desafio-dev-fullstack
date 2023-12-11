import { DbAddLead } from '@/data/usecases/lead/db-add-lead'
import { AddLead } from '@/domain/usecases/lead/add-lead'
import { LeadPrismaRepository } from '@/infra/db/prisma/lead-prisma-repository'

export const makeDbAddLead = (): AddLead => {
  const addLeadRepository = new LeadPrismaRepository()
  return new DbAddLead(addLeadRepository)
}
