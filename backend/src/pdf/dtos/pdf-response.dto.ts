import { ConsumoItemDto } from './invoice-item.dto';

export interface PdfResponseDto {
  valor: number;
  barcode: string;
  chargingModel: string;
  phaseModel: string;
  unit_key: string;
  invoice: ConsumoItemDto[];
  energy_company_id: string;
}
