import { DomainError } from "@/domain/errors/domain-error";

export class InvalidHistoricConsumptionLenghtError
  extends Error
  implements DomainError
{
  constructor(codigoDaUnidadeConsumidora: string) {
    super(
      `A unidade ${codigoDaUnidadeConsumidora} não possui o histórico de consumo dos ultimos 12 meses`
    );
    this.name = "InvalidHistoricConsumptionLenghtError";
  }
}
