export interface EnergyConsumption {
  barcode: string;
  chargingModel: string;
  energy_company_id: string;
  invoice: Invoice[];
  phaseModel: string;
  unit_key: string;
  valor: number;
}

type Invoice = {
  consumo_fp: number;
  consumo_date: Date;
};
