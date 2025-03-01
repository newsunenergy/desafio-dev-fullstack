import { Enquadramento } from 'src/unidade/entities/enum/enquadramento.enum';
import { ModeloFasico } from 'src/unidade/entities/enum/modelo-fasico.enum';

export interface EnergyBill {
  valor: number;
  barcode: string;
  chargingModel: Enquadramento;
  phaseModel: ModeloFasico;
  unit_key: string;
  invoice: {
    consumo_fp: number;
    consumo_date: Date;
  }[];
}
