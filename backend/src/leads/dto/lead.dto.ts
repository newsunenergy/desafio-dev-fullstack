export class LeadDto {
  id: string;
  name: string;
  email: string;
  phone: string;
  amount?: number;
  barcode?: string;
  chargingModel?: string;
  phaseModel?: string;
  unitKey?: string;
  energyCompanyId?: string;
  createdAt: Date;
  updatedAt: Date;
}
