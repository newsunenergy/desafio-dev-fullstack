import { Unidade } from '@/domain/models/unit'

export interface LoadLeadById {
  loadById: (params: LoadLeadById.Params) => Promise<LoadLeadById.Result>
}

export namespace LoadLeadById {
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
