import { InvalidEmailError } from "../entities/lead/errors/invalid-email";
import { Either, left, right } from "../shared/either";

export class Email {
  private readonly email: string;

  get value() {
    return this.email;
  }

  private constructor(email: string) {
    this.email = email;
  }

  static validate(email: string) {
    if (!email) return false;

    const EMAIL_REGEXP = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!EMAIL_REGEXP.test(email)) {
      return false;
    }

    return true;
  }

  static create(email: string): Either<InvalidEmailError, Email> {
    if (!this.validate(email)) {
      return left(new InvalidEmailError(email));
    }

    return right(new Email(email));
  }
}
