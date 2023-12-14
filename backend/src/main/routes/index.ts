import { Router } from 'express'
import { makeAddLeadController } from '../factories/controllers/add-lead-controller-factory'
import { makeLoadLeadByIdController } from '../factories/controllers/load-lead-by-id-controller'
import { makeLoadLeadsController } from '../factories/controllers/load-leads-controller-factory'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/lead', adaptRoute(makeAddLeadController()))
  router.get('/lead', adaptRoute(makeLoadLeadByIdController()))
  router.get('/filtered-leads', adaptRoute(makeLoadLeadsController()))
}
