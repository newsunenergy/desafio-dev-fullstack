import { UseCaseError } from "@/domain/errors/use-case-error";

export class LeadAlreadyExistsError extends Error implements UseCaseError {
  constructor(email: string) {
    super(`O e-mail "${email}" já foi usado.`);
    this.name = "LeadAlreadyExistsError";
  }
}
