export interface Lead {
  id?: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  unidades: Unidade[];
}

interface Unidade {
  codigoDaUnidadeConsumidora: string;
  modeloFasico: string;
  enquadramento: string;
  historicoDeConsumoEmKWH: Consumo[];
}

interface Consumo {
  consumoForaPontaEmKWH: number;
  mesDoConsumo: Date;
}
