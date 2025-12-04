type Invoice = {
  consumo_fp: number,
  consumo_date: Date
}
export type DecodedBill = {
  valor: number,
  barcode: string,
  chargingModel: string,
  phaseModel: string,
  unit_key: string,
  energy_company_id: string
  invoice: Invoice[],
}