import { randomUUID } from 'crypto';

export interface ConsumoProps {
  consumoForaPontaEmKWH: number;
  mesDoConsumo: string;
  unidadeId?: string;
}

export class Consumo {
  private _id: string;
  private props: ConsumoProps;

  constructor(props: ConsumoProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = props;
  }

  public get id() {
    return this._id;
  }

  public get consumoForaPontaEmKWH() {
    return this.props.consumoForaPontaEmKWH;
  }

  public set consumoForaPontaEmKWH(consumoForaPontaEmKWH) {
    this.props.consumoForaPontaEmKWH = consumoForaPontaEmKWH;
  }

  public get mesDoConsumo() {
    return this.props.mesDoConsumo;
  }

  public set mesDoConsumo(mesDoConsumo) {
    this.props.mesDoConsumo = mesDoConsumo;
  }

  public get unidadeId() {
    return this.props.unidadeId;
  }

  public set unidadeId(unidadeId) {
    this.props.unidadeId = unidadeId;
  }
}
