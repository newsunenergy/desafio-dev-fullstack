import { AddLead } from '@/domain/usecases/lead/add-lead'
import { CheckExistentLead } from '@/domain/usecases/lead/check-existent-lead'
import { CheckExistentUnit } from '@/domain/usecases/units/check-existent-unit'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { LeadExistsError } from '@/presentation/errors/lead-exists-error'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpResponse } from '@/presentation/protocols/http'
import { UnitExistsError } from '@/presentation/errors/unit-exists-error'

export class AddLeadController implements Controller {
  constructor (
    private readonly addLeadUsecase: AddLead,
    private readonly checkLeadExists: CheckExistentLead,
    private readonly checkUnitExists: CheckExistentUnit
  ) {}

  async handle (request: AddLeadController.Params): Promise<HttpResponse> {
    try {
      if (!request.email) return badRequest(new MissingParamError('email'))
      if (!request.name) return badRequest(new MissingParamError('name'))
      if (!request.phone) return badRequest(new MissingParamError('phone'))
      if (!request.unidades.length) return badRequest(new InvalidParamError('should send at least 1 unit'))
      const leadExists = await this.checkLeadExists.leadExists({ email: request.email })
      const unitExists = await this.checkUnitExists.unitExists({ codigoDeUnidadesConsumidoras: request.unidades.map((unit) => unit.codigoDaUnidadeConsumidora) })

      if (leadExists) return badRequest(new LeadExistsError())
      if (unitExists) return badRequest(new UnitExistsError())

      await this.addLeadUsecase.addLead(request)
      return ok(true)
    } catch (err) {
      console.log(err)
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
