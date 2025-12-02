import { DomainError } from "@/domain/errors/domain-error";

export class InvalidValueError extends Error implements DomainError {
  constructor() {
    super(`Valor Inválido`);
    this.name = "InvalidValueError";
  }
}
