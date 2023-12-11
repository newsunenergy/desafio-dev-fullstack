import { Unidade } from '@/domain/models/unit'

export interface LoadLeadById {
  leadExists: (params: LoadLeadById.Params) => Promise<boolean>
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
  }
}
