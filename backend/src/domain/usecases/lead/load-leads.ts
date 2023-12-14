import { Unidade } from '@/domain/models/unit'

export interface LoadLeads {
  load: (params: LoadLeads.Params) => Promise<LoadLeads.Result>
}

export namespace LoadLeads {
  export type Params = {
    name?: string
    email?: string
    codigoDaUnidadeConsumidora?: string
  }
  export type Result = Array<{
    id: number
    name: string
    email: string
    phone: string
    unidades: Unidade[]
  }>
}
