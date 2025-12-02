import { Telefone } from "./telefone";

describe("User telefone value object", () => {
  it("Deve criar um telefone válido", () => {
    const telefoneOrError = Telefone.create("71986479754");

    expect(telefoneOrError.isRight()).toBeTruthy();
  });

  it("Deve rejeitar um telefone incorreto", () => {
    const telefoneOrError1 = Telefone.create("123");
    const telefoneOrError2 = Telefone.create("123456");
    const telefoneOrError3 = Telefone.create("11231321321321231");

    expect(telefoneOrError1.isLeft()).toBeTruthy();
    expect(telefoneOrError2.isLeft()).toBeTruthy();
    expect(telefoneOrError3.isLeft()).toBeTruthy();
  });
});
