export type ConsumptionHistory = {
  consumptionDate: string | Date;
  offPeakKwh: number;
  peakKwh: number;
};

export type Unit = {
  id: string;
  codigoDaUnidadeConsumidora: string;
  historicoDeConsumoEmKWH: ConsumptionHistory[];
  amount: number;
  barcode: string;
  chargingModel: string;
  phaseModel: string;
  energyCompanyId: string;
  createdAt: string;
  updatedAt: string;
};

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  units: Unit[];
  createdAt: string;
  updatedAt: string;
};

export type CreateLeadRequest = {
  name: string;
  email: string;
  phone: string;
  file: File;
};

export type CreateLeadResponse = {
  lead: Omit<Lead, "units">;
  unit: Unit;
};
