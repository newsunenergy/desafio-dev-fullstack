import { Either, right } from "../shared/either";

export interface ConsumoProps {
  consumoForaPontaEmKWH: number;
  mesDoConsumo: Date;
}

export class Consumo {
  readonly consumoForaPontaEmKWH: number;
  readonly mesDoConsumo: Date;

  constructor(props: ConsumoProps) {
    this.consumoForaPontaEmKWH = props.consumoForaPontaEmKWH;
    this.mesDoConsumo = props.mesDoConsumo;
  }

  static create(consumo: ConsumoProps) {
    return new Consumo(consumo);
  }
}
