export interface IClient {
  nome: string;
  email: string;
  telefone: string;
  unidades?: Unidade[];
}

export interface IDataPdf {
  nome: string;
  unit_key?: string;
  phaseModel: string;
  chargingModel: string;
  invoice: {
    consumo_fp: number;
    consumo_date: string;
  }[];
}

export interface Unidade {
  clientId?: string;
  id?: string;
  codigoDaUnidadeConsumidora: string;
  modeloFasico: 'monofasico' | 'bifasico' | 'trifasico';
  enquadramento: 'AX' | 'B1' | 'B2' | 'B3';
  historicoDeConsumoEmKWH: Consumo[];
}

export interface Consumo {
  consumoForaPontaEmKWH: number;
  mesDoConsumo: Date;
}
export interface IData extends IClient, IDataPdf {
  unidades: Unidade[];
}

export interface ILeadFilters {
  nome?: string;
  email?: string;
  telefone?: string;
}
