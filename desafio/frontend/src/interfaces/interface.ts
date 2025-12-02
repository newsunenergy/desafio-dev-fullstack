export interface Simulacao {
  id: string;
  codigoDaUnidadeConsumidora: string;
  enquadramento: string;
  leadId: string;
  modeloFasico: string;
  lead: Lead;
  historicoDeConsumoEmKWH: Consumo[];
}

export interface Lead {
  id: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
}

export interface Consumo {
  id: string;
  unidadeId: string;
  consumoForaPontaEmKWH: number;
  mesDoConsumo: Date;
}
