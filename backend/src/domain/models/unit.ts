type Consumo = {
  consumoForaPontaEmKWH: number
  mesDoConsumo: Date
}

export type Unidade = {
  id: string
  codigoDaUnidadeConsumidora: string
  modeloFasico: 'monofasico' | 'bifasico' | 'trifasico'
  enquadramento: 'AX' | 'B1' | 'B2' | 'B3'
  historicoDeConsumoEmKWH: Consumo[]
}
