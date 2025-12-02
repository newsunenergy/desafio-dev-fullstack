import { DomainError } from "@/domain/errors/domain-error";

export class InvalidUnityError extends Error implements DomainError {
  constructor() {
    super("Deve haver no minímo 1 unidade para criar um lead.");
    this.name = "InvalidUnityError";
  }
}
