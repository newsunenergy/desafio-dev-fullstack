import { LoadLeads } from '@/domain/usecases/lead/load-leads'
import { ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpResponse } from '@/presentation/protocols/http'

export class LoadLeadsController implements Controller {
  constructor (private readonly loadLeads: LoadLeads) { }

  async handle (request: LoadLeadsController.Params): Promise<HttpResponse> {
    try {
      const leads = await this.loadLeads.load(request)
      return ok(leads)
    } catch (err) {
      return serverError(err as Error)
    }
  }
}

export namespace LoadLeadsController {
  export type Params = {
    email?: string
    name?: string
    codigoDaUnidadeConsumidora?: string
  }
}
