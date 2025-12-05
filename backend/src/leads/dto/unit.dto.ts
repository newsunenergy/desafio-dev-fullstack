import { ConsumptionHistoryDto } from './consumption-history.dto';

export class UnitDto {
  id: string;
  codigoDaUnidadeConsumidora: string;
  historicoDeConsumoEmKWH: ConsumptionHistoryDto[];
  amount: number;
  barcode: string;
  chargingModel: string;
  phaseModel: string;
  energyCompanyId: string;
  createdAt: Date;
  updatedAt: Date;
}
