export interface Consumo {
  id: number;
  consumoForaPontaEmKWH: number;
  mesDoConsumo: string;
}

export interface Unidade {
  id: number;
  codigoDaUnidadeConsumidora: string;
  modeloFasico: string;
  enquadramento: string;
  historicoDeConsumoEmKWH: Consumo[];
}

export interface Lead {
  id: number;
  nomeCompleto: string;
  email: string;
  telefone: string;
  unidades: Unidade[];
  createdAt: string;
}
