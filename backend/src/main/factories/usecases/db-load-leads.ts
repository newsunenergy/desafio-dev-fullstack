import { DbLoadLeadsLead } from '@/data/usecases/lead/db-load-leads'
import { LoadLeads } from '@/domain/usecases/lead/load-leads'
import { LeadPrismaRepository } from '@/infra/db/prisma/lead-prisma-repository'

export const makeDbLoadLeads = (): LoadLeads => {
  const loadLeadByIdRepository = new LeadPrismaRepository()
  return new DbLoadLeadsLead(loadLeadByIdRepository)
}
