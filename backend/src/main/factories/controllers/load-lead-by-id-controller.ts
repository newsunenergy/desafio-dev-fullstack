import { LoadLeadByIdController } from '@/presentation/controllers/lead/load-lead-by-id-controller'
import { makeDbLoadLeadById } from '../usecases/db-load-lead-by-id'

export const makeLoadLeadByIdController = (): LoadLeadByIdController => {
  return new LoadLeadByIdController(makeDbLoadLeadById())
}
