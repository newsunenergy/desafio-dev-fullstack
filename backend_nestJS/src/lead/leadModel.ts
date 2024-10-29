export interface Lead {
  id: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  unidades: Unidade[];
}

export interface Unidade {
  id: string;
  codigoDaUnidadeConsumidora: string;
  modeloFasico: "monofasico" | "bifasico" | "trifasico";
  enquadramento: "AX" | "B1" | "B2" | "B3";
  historicoDeConsumoEmKWH: Consumo[];
}

export interface Consumo {
  consumoForaPontaEmKWH: number;
  mesDoConsumo: Date;
}

export interface LeadPDF {
  valor: number;
  barcode: string;
  chargingModel: string;
  phaseModel: string;
  unit_key: string;
  invoice: invoicePDF[];
  energy_company_id: string;
}

export interface invoicePDF {
  consumo_fp: number;
  consumo_date: Date;
}
