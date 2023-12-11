import { LoadLeadById } from '@/domain/usecases/lead/load-lead-by-id'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpResponse } from '@/presentation/protocols/http'

export class LoadLeadByIdController implements Controller {
  constructor (private readonly loadLeadById: LoadLeadById) {}

  async handle (request: LoadLeadByIdController.Params): Promise<HttpResponse> {
    try {
      if (!request.id) return badRequest(new MissingParamError('id'))

      const lead = await this.loadLeadById.loadById(request)
      return ok(lead)
    } catch (err) {
      return serverError(err as Error)
    }
  }
}

export namespace LoadLeadByIdController {
  export type Params = {
    id: number
  }
}
