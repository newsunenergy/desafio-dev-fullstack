export interface Lead {
  id: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  unidades: Unidade[];
}

export interface HistoricoDeConsumoEmKWH {
  consumoForaPontaEmKWH: number;
  mesDoConsumo: Date;
}

export interface Unidade {
  valor: string;
  codigoDaUnidadeConsumidora: string;
  modeloFasico: "monofasico" | "bifasico" | "trifasico";
  enquadramento: "AX" | "B1" | "B2" | "B3";
  historicoDeConsumoEmKWH: ConsumoProps[];
}

export interface ConsumoProps {
  consumoForaPontaEmKWH: number;
  mesDoConsumo: Date;
}
