import { Unidade } from '@/domain/models/unit'

export interface AddLeadRepository {
  add: (params: AddLeadRepository.Params) => Promise<void>
}

export namespace AddLeadRepository {
  export type Params = {
    name: string
    email: string
    phone: string
    unidades: Unidade[]
  }
}
