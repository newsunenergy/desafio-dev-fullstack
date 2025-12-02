import { Email } from "./email";

describe("User email value object", () => {
  it("Deve criar um email válido", () => {
    const emailOrError = Email.create("johndoe@example.com");

    expect(emailOrError.isRight()).toBeTruthy();
  });

  it("Deve rejeitar um email incorreto", () => {
    const emailOrError1 = Email.create("johndoe");
    const emailOrError2 = Email.create("johndoe@example");
    const emailOrError3 = Email.create("@example.com");
    const emailOrError4 = Email.create("johndoe@example.");

    expect(emailOrError1.isLeft()).toBeTruthy();
    expect(emailOrError2.isLeft()).toBeTruthy();
    expect(emailOrError3.isLeft()).toBeTruthy();
    expect(emailOrError4.isLeft()).toBeTruthy();
  });
});
