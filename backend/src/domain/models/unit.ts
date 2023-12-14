type Consumo = {
  consumoForaPontaEmKWH: number
  mesDoConsumo: Date
}

export type Unidade = {
  id: string
  codigoDaUnidadeConsumidora: string
  modeloFasico: string
  enquadramento: string
  consumoEmReais: number
  historicoDeConsumoEmKWH: Consumo[]
}
