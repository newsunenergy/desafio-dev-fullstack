import { Unidade } from '@/domain/models/unit'

export interface LoadLeadRepository {
  load: (params: LoadLeadRepository.Params) => Promise<LoadLeadRepository.Result>
}

export namespace LoadLeadRepository {
  export type Params = {
    id?: number
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
