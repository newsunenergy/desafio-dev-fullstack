import { Unidade } from '@/domain/models/unit'

export interface AddLead {
  addLead: (params: AddLead.Params) => Promise<void>
}

export namespace AddLead {
  export type Params = {
    name: string
    email: string
    phone: string
    unidades: Unidade[]
  }
}
