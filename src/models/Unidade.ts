import { ConsumoMensal } from './Consumo';

export class Unidade {
  id: string;
  codigoDaUnidadeConsumidora: string;
  modeloFasico: 'monofasico' | 'bifasico' | 'trifasico';
  enquadramento: 'AX' | 'B1' | 'B2' | 'B3';
  historicoDeConsumoEmKWH: ConsumoMensal[];

  constructor(
    id: string,
    codigoDaUnidadeConsumidora: string,
    modeloFasico: 'monofasico' | 'bifasico' | 'trifasico',
    enquadramento: 'AX' | 'B1' | 'B2' | 'B3',
    historicoDeConsumoEmKWH: ConsumoMensal[]
  ) {
    this.id = id;
    this.codigoDaUnidadeConsumidora = codigoDaUnidadeConsumidora;
    this.modeloFasico = modeloFasico;
    this.enquadramento = enquadramento;
    this.historicoDeConsumoEmKWH = historicoDeConsumoEmKWH;
  }
}
