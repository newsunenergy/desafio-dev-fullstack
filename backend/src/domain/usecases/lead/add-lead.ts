import { Unidade } from '../../models/unit'

export interface AddLead {
  addLead: () => Promise<void>
}

export namespace AddLead {
  export type Params = {
    name: string
    email: string
    phone: string
    unidades: Unidade[]
  }
}
