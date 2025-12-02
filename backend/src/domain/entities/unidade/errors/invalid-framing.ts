import { DomainError } from "@/domain/errors/domain-error";

export class InvalidFramingError extends Error implements DomainError {
  constructor(framing: string) {
    super(`O enquadramento '${framing}' não é suportado ou não existe.`);
    this.name = "InvalidFramingError";
  }
}
