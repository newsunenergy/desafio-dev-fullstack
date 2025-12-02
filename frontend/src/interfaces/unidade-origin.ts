export interface UnidadeOrigin {
  valor: number;
  barcode: string;
  chargingModel: string;
  phaseModel: string;
  unit_key: string;
  invoice: Invoice[];
  energy_company_id: string;
}

export interface Invoice {
  consumo_fp: number;
  consumo_date: string;
}
