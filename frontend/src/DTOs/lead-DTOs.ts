export interface LeadDTO {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface UnitDTO {
  consumerUnitCode: string;
  name: string;
  framing: string;
  phaseModel: string;
  createdAt: string;
}

export interface ConsumptionDTO {
  offPeakInKWH: number;
  consumptionMonth: string;
}

export interface UnitWithConsumptionsDTO {
  unit: UnitDTO;
  consumptions: ConsumptionDTO[];
}

export interface LeadWithUnitsDTO {
  lead: LeadDTO;
  units: UnitWithConsumptionsDTO[];
}
