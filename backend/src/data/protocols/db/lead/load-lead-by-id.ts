import { Unidade } from '@/domain/models/unit'

export interface LoadLeadByIdRepository {
  loadById: (params: LoadLeadByIdRepository.Params) => Promise<LoadLeadByIdRepository.Result>
}

export namespace LoadLeadByIdRepository {
  export type Params = {
    id: number
  }
  export type Result = {
    id: number
    name: string
    email: string
    phone: string
    unidades: Unidade[]
  } | null
}
