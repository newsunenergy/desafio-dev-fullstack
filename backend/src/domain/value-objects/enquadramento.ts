import { InvalidFramingError } from "../entities/unidade/errors/invalid-framing";
import { EnquadramentoTypes } from "../entities/unidade/unidade";
import { Either, left, right } from "../shared/either";

const enquadramentos = ["AX", "B1", "B2", "B3"];

export class Enquadramento {
  private readonly framing: string;

  get value() {
    return this.framing as EnquadramentoTypes;
  }

  constructor(framing: string) {
    this.framing = framing;
  }

  static validate(framing: string) {
    if (!enquadramentos.includes(framing)) {
      return false;
    }
    return true;
  }

  static create(framing: string): Either<InvalidFramingError, Enquadramento> {
    if (!this.validate(framing)) {
      return left(new InvalidFramingError(framing));
    }

    return right(new Enquadramento(framing));
  }
}
