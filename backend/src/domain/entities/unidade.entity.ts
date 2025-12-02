import { Consumo } from './consumo.entity';

export type ModeloFasico = 'monofasico' | 'bifasico' | 'trifasico';
export type Enquadramento = 'AX' | 'B1' | 'B2' | 'B3';

export class Unidade {
  constructor(
    public id: string,
    public codigoDaUnidadeConsumidora: string,
    public modeloFasico: ModeloFasico,
    public enquadramento: Enquadramento,
    public historicoDeConsumoEmKWH: Consumo[],
  ) {}
}
