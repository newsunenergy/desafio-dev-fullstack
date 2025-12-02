import { DomainError } from "@/domain/errors/domain-error";

export class InvalidModelError extends Error implements DomainError {
  constructor(model: string) {
    super(`O modelo '${model}' não é suportado ou não existe.`);
    this.name = "InvalidModelError";
  }
}
