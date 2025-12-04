import { DbCheckExistentLead } from '@/data/usecases/lead/db-check-existent-lead'
import { CheckExistentLead } from '@/domain/usecases/lead/check-existent-lead'
import { LeadPrismaRepository } from '@/infra/db/prisma/lead-prisma-repository'

export const makeDbExistentLead = (): CheckExistentLead => {
  const loadLeadRepository = new LeadPrismaRepository()
  return new DbCheckExistentLead(loadLeadRepository)
}
