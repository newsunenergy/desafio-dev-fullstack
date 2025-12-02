type LeadInput = {
  nomeCompleto: string;
  email: string;
  telefone: string;
  unidades: UnidadeInput[];
};

type UnidadeInput = {
  valor: number;
  barcode: string;
  chargingModel: "AX" | "B1" | "B2" | "B3";
  phaseModel: "monofasico" | "bifasico" | "trifasico";
  unit_key: string;
  invoice: Invoice[];
  energy_company_id: string;
};

type Invoice = {
  consumo_fp: number;
  consumo_date: string;
};

export class LeadDTO {
  nomeCompleto: string;
  email: string;
  telefone: string;
  unidades: any[];

  constructor(props: LeadInput) {
    this.nomeCompleto = props.nomeCompleto;
    this.email = props.email;
    this.telefone = props.telefone;
    this.unidades = props.unidades.map((uni) => ({
      valor: uni.valor,
      codigoDaUnidadeConsumidora: uni.unit_key,
      enquadramento: uni.chargingModel,
      modeloFasico: uni.phaseModel,
      historicoDeConsumoEmKWH: uni.invoice.map((inv) => ({
        consumoForaPontaEmKWH: inv.consumo_fp,
        mesDoConsumo: new Date(inv.consumo_date),
      })),
    }));
  }
}
