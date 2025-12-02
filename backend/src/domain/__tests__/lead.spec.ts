import { Lead, LeadProps } from "../entities/lead/lead";
import { Unidade } from "../entities/unidade/unidade";
import { Email } from "../value-objects/email";
import { Enquadramento } from "../value-objects/enquadramento";
import { ModeloFasico } from "../value-objects/modelo-fasico";
import { Telefone } from "../value-objects/telefone";
import { Valor } from "../value-objects/valor";
import { generateHistoricoDeConsumoEmKWH } from "./unidade.spec";

let inputUnidade: Unidade[];

let inputLead: LeadProps;

describe("Lead Tests", () => {
  beforeEach(() => {
    inputUnidade = [
      {
        valor: Valor.create(754.25).value as Valor,
        codigoDaUnidadeConsumidora: "1212",
        enquadramento: Enquadramento.create("B1").value as Enquadramento,
        modeloFasico: ModeloFasico.create("bifasico").value as ModeloFasico,
        historicoDeConsumoEmKWH: generateHistoricoDeConsumoEmKWH(12),
      },
    ] as Unidade[];

    inputLead = {
      email: Email.create("abc@gmail.com").value as Email,
      nomeCompleto: "Tarcisio",
      telefone: Telefone.create("71986797445").value as Telefone,
      unidades: inputUnidade,
    };
  });

  it("Deve criar uma nova lead", () => {
    const lead = Lead.create(inputLead);

    expect(lead.isRight()).toBeTruthy();
  });

  it("Deve disparar um erro ao tentar criar uma lead sem uma unidade", () => {
    inputLead.unidades = [];

    expect(() => Lead.create(inputLead).isLeft).toBeTruthy();
  });
});
