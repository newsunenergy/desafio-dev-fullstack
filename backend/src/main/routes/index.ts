import { Router } from 'express'
import { makeAddLeadController } from '../factories/controllers/add-lead-controller-factory'

export default (router: Router): void => {
  router.post('/lead', makeAddLeadController)
}
