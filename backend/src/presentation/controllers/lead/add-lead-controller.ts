import { AddLead } from '@/domain/usecases/lead/add-lead'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpResponse } from '@/presentation/protocols/http'

export class AddLeadController implements Controller {
  constructor (private readonly addLeadUsecase: AddLead) {}
  async handle (request: AddLeadController.Params): Promise<HttpResponse> {
    try {
      if (!request.email) return badRequest(new MissingParamError('email'))
      if (!request.name) return badRequest(new MissingParamError('name'))
      if (!request.phone) return badRequest(new MissingParamError('phone'))
      if (!request.unidades.length) return badRequest(new InvalidParamError('should send at least 1 unit'))

      await this.addLeadUsecase.addLead(request)
      return ok(true)
    } catch (err) {
      return serverError(err as Error)
    }
  }
}

export namespace AddLeadController {
  type Consumo = {
    consumoForaPontaEmKWH: number
    mesDoConsumo: Date
  }

  export type Unidade = {
    id: string
    codigoDaUnidadeConsumidora: string
    modeloFasico: 'monofasico' | 'bifasico' | 'trifasico'
    enquadramento: 'AX' | 'B1' | 'B2' | 'B3'
    historicoDeConsumoEmKWH: Consumo[]
  }

  export type Params = {
    name: string
    email: string
    phone: string
    unidades: Unidade[]
  }
}
