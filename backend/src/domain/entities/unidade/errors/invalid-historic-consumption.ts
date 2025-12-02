import { DomainError } from "@/domain/errors/domain-error";

export class InvalidHistoricConsumptionError
  extends Error
  implements DomainError
{
  constructor() {
    super(`Por favor, certifique-se de enviar o histórico de consumo.`);
    this.name = "InvalidHistoricConsumptionError";
  }
}
