import { Unidade } from '@/domain/models/unit'

export interface LoadUnitRepository {
  load: (params: LoadUnitRepository.Params) => Promise<LoadUnitRepository.Result>
}

export namespace LoadUnitRepository {
  export type Params = {
    codigoDeUnidadesConsumidoras: string[]
    leadId?: number
    leadName?: string
    leadEmail?: string
    leadPhone?: string
  }
  export type Result = Unidade[]

}
