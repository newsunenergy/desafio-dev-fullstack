import { Unidade, UnidadeProps } from "../entities/unidade/unidade";
import { Enquadramento } from "../value-objects/enquadramento";
import { ModeloFasico } from "../value-objects/modelo-fasico";
import { Valor } from "../value-objects/valor";

export function generateHistoricoDeConsumoEmKWH(length: number) {
  return Array.from({ length }, (_, index) => ({
    consumoForaPontaEmKWH: index + 1,
    mesDoConsumo: new Date(),
  }));
}

it("Deve disparar um erro ao tentar criar um sem o historico dos ultimos doze meses", () => {
  let inputUnidade: UnidadeProps = {
    valor: Valor.create(754.25).value as Valor,
    codigoDaUnidadeConsumidora: "1212",
    enquadramento: Enquadramento.create("B1").value as Enquadramento,
    modeloFasico: ModeloFasico.create("bifasico").value as ModeloFasico,
    historicoDeConsumoEmKWH: generateHistoricoDeConsumoEmKWH(2),
  };

  expect(() => Unidade.create(inputUnidade).isLeft()).toBeTruthy();
});
