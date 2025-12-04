export interface CheckExistentUnit {
  unitExists: (params: CheckExistentUnit.Params) => Promise<boolean>
}

export namespace CheckExistentUnit {
  export type Params = {
    codigoDeUnidadesConsumidoras: string[]
  }
}
