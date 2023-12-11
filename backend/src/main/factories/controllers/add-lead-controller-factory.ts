import { AddLeadController } from '@/presentation/controllers/lead/add-lead-controller'
import { makeDbAddLead } from '../usecases/db-add-lead-usecase-factory'

export const makeAddLeadController = (): AddLeadController => {
  return new AddLeadController(makeDbAddLead())
}
