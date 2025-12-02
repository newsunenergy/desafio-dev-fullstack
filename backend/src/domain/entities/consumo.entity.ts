export class Consumo {
  constructor(
    public id: string,
    public consumoForaPontaEmKWH: number,
    public mesDoConsumo: Date,
  ) {}
}
