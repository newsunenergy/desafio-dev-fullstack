import { Lead } from '../../base/lead'

export class LeadEntity extends Lead {
  public nomeCompleto: string
  public email: string
  public telefone: string
  public unidades: Unidade[]
}

class Unidade {
  id: string
  codigoDaUnidadeConsumidora: string
  modeloFasico: 'monofasico' | 'bifasico' | 'trifasico'
  enquadramento: 'AX' | 'B1' | 'B2' | 'B3'
  historicoDeConsumoEmKWH: Consumo[]
}

class Consumo {
  consumoForaPontaEmKWH: number
  mesDoConsumo: Date
}
