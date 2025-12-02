import { InvalidValueError } from "../entities/unidade/errors/invalid-value";
import { Either, left, right } from "../shared/either";

export class Valor {
  private readonly valor: number;

  get value() {
    return this.valor;
  }

  constructor(valor: number) {
    this.valor = valor;
  }

  static validate(valor: number) {
    if (!valor) return false;

    return true;
  }

  getCurrencyFormat() {
    const BRLCurrency = new Intl.NumberFormat("pt-BR", {
      currency: "BRL",
      style: "currency",
    }).format(this.valor);

    return BRLCurrency;
  }

  static create(valor: number): Either<InvalidValueError, Valor> {
    if (!this.validate(valor)) {
      return left(new InvalidValueError());
    }

    return right(new Valor(valor));
  }
}
