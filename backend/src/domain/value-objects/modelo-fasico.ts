import { InvalidModelError } from "../entities/unidade/errors/invalid-model";
import { ModeloFasicoTypes } from "../entities/unidade/unidade";
import { Either, left, right } from "../shared/either";

const modelosFasicos = ["monofasico", "bifasico", "trifasico"];

export class ModeloFasico {
  private readonly model: string;

  get value() {
    return this.model as ModeloFasicoTypes;
  }

  constructor(model: string) {
    this.model = model;
  }

  static validate(model: string) {
    if (!modelosFasicos.includes(model)) {
      return false;
    }
    return true;
  }

  static create(model: string): Either<InvalidModelError, ModeloFasico> {
    if (!this.validate(model)) {
      return left(new InvalidModelError(model));
    }

    return right(new ModeloFasico(model));
  }
}
