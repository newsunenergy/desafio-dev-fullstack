import { LoadLeadsController } from '@/presentation/controllers/lead/load-leads-controller'
import { makeDbLoadLeads } from '../usecases/db-load-leads'

export const makeLoadLeadsController = (): LoadLeadsController => {
  return new LoadLeadsController(makeDbLoadLeads())
}
