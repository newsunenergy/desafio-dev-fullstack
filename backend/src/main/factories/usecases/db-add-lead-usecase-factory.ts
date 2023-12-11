import { DbAddLead } from '@/data/usecases/lead/add-lead'
import { AddLead } from '@/domain/usecases/lead/add-lead'

export const makeDbAddLead = (): AddLead => {
  const addLeadRepository = new LeadPrismaRepository()
  return new DbAddLead(addLeadRepository)
}
