export interface CheckExistentLead {
  leadExists: (params: CheckExistentLead.Params) => Promise<boolean>
}

export namespace CheckExistentLead {
  export type Params = {
    email: string
    codigoDaUnidadeConsumidora: string
  }
}
