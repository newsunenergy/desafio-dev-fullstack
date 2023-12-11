import { Unidade } from '@/domain/models/unit'

export interface LoadUnits {
  load: (params: LoadUnits.Params) => Promise<boolean>
}

export namespace LoadUnits {
  export type Params = {
    name: string
    email: string
    codigoDeUnidadesConsumidoras: string[]
  }
  export type Result = Array<{
    id: number
    name: string
    email: string
    phone: string
    unidades: Unidade[]
  }>
}
