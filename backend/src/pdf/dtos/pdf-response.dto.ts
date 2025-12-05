export interface ExternalInvoiceItemDto {
  consumo_date: string;
  consumo_fp: number;
  consumo_p: number;
}

export interface ExternalPdfResponseDto {
  valor: number;
  barcode: string;
  chargingModel: string;
  phaseModel: string;
  unit_key: string;
  invoice: ExternalInvoiceItemDto[];
  energy_company_id: string;
}
