import { v4 as uuidv4, validate } from "uuid";
import { EntityError } from "../shared/entity-error";

export class Id {
  constructor(readonly value: string = uuidv4()) {
    if (!validate(value)) throw new EntityError("Id inválido");
  }
}
