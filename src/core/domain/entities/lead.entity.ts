import { Lead } from '../../base/lead'

export class LeadEntity extends Lead {
  public id: string
  public nomeCompleto: string
  public email: string
  public telefone: string
  public unidades: Unidade[]
}
export class Unidade {
  id: string
  codigoDaUnidadeConsumidora: string
  modeloFasico: 'monofasico' | 'bifasico' | 'trifasico'
  enquadramento: 'AX' | 'B1' | 'B2' | 'B3'
  historicoDeConsumoEmKWH: Consumo[]
}

export class Consumo {
  consumoForaPontaEmKWH: number
  mesDoConsumo: Date
}
