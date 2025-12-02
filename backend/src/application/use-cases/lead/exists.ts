import { InvalidEmailError } from "@/domain/entities/lead/errors/invalid-email";
import { Lead } from "@/domain/entities/lead/lead";
import { LeadRepository } from "@/domain/repository-interfaces/lead-repository";
import { Either, left, right } from "@/domain/shared/either";
import { Email } from "@/domain/value-objects/email";
import { LeadAlreadyExistsError } from "./errors/lead-already-exists";

type ExistsResponse = Either<
  InvalidEmailError | Lead | null,
  LeadAlreadyExistsError
>;

export class Exists {
  constructor(private readonly leadRepo: LeadRepository) {}
  async execute(email: string): Promise<ExistsResponse> {
    const emailOrError = Email.create(email);

    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    const leadCreated = await this.leadRepo.exists(email);

    if (leadCreated) return right(new LeadAlreadyExistsError(email));

    return left(leadCreated);
  }
}
