import { InvalidPhoneError } from "../entities/lead/errors/invalid-phone";
import { Either, left, right } from "../shared/either";

export class Telefone {
  private readonly telefone: string;

  get value() {
    return this.telefone;
  }
  constructor(telefone: string) {
    this.telefone = telefone;
  }

  static validate(telefone: string) {
    if (!telefone) return false;

    const TELEFONE_REGEXP = /^(\(?\d{2}\)?\s?)?(\d{4,5}-?\d{4})$/;

    if (!TELEFONE_REGEXP.test(telefone)) {
      return false;
    }

    return true;
  }

  static create(telefone: string): Either<InvalidPhoneError, Telefone> {
    if (!this.validate(telefone)) {
      return left(new InvalidPhoneError(telefone));
    }

    return right(new Telefone(telefone));
  }
}
