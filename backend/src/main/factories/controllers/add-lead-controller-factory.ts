import { AddLeadController } from '@/presentation/controllers/lead/add-lead-controller'
import { makeDbAddLead } from '../usecases/db-add-lead-usecase-factory'
import { makeDbExistentLead } from '../usecases/db-check-existent-lead'

export const makeAddLeadController = (): AddLeadController => {
  return new AddLeadController(makeDbAddLead(), makeDbExistentLead())
}
