export type File = {
  originalName: string;
  encoding: string;
  busBoyMimeType: string;
  buffer: Buffer;
  size: number;
  fileType: {
    ext: string;
    mime: string;
  };
};

export type SimulationDTO = {
  nomeCompleto: string;
  email: string;
  telefone: string;
  arquivo: File;
};

export type QueryListaSimulacoesDto = {
  busca: string;
};

interface InvoiceItem {
  consumo_fp: number;
  consumo_date: string;
}

export interface EnergyData {
  valor: number;
  barcode: string;
  chargingModel: string;
  phaseModel: string;
  unit_key: string;
  invoice: InvoiceItem[];
  energy_company_id: string;
}
