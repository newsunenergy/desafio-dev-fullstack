import { Entity } from './entity'

export abstract class Lead extends Entity {
  nomeCompleto: string
  email: string
  telefone: string
  unidades: Unidade[]
}

abstract class Unidade {
  id: string
  codigoDaUnidadeConsumidora: string
  modeloFasico: 'monofasico' | 'bifasico' | 'trifasico'
  enquadramento: 'AX' | 'B1' | 'B2' | 'B3'
  historicoDeConsumoEmKWH: Consumo[]
}

abstract class Consumo {
  consumoForaPontaEmKWH: number
  mesDoConsumo: Date
}
