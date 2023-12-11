import { DbLoadLeadByIdLead } from '@/data/usecases/lead/db-load-lead-by-id'
import { LoadLeadById } from '@/domain/usecases/lead/load-lead-by-id'
import { LeadPrismaRepository } from '@/infra/db/prisma/lead-prisma-repository'

export const makeDbLoadLeadById = (): LoadLeadById => {
  const loadLeadByIdRepository = new LeadPrismaRepository()
  return new DbLoadLeadByIdLead(loadLeadByIdRepository)
}
