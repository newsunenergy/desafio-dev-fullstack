import { Router } from 'express'
import { makeAddLeadController } from '../factories/controllers/add-lead-controller-factory'
import { makeLoadLeadByIdController } from '../factories/controllers/load-lead-by-id-controller'

export default (router: Router): void => {
  router.post('/lead', makeAddLeadController)
  router.get('/lead', makeLoadLeadByIdController)
}
