import { Either, left, right } from "@/domain/shared/either";
import { Entity } from "../../shared/entity";
import { Consumo } from "../../value-objects/consumo";
import { Enquadramento } from "../../value-objects/enquadramento";
import { ModeloFasico } from "../../value-objects/modelo-fasico";
import { Valor } from "../../value-objects/valor";
import { InvalidHistoricConsumptionError } from "./errors/invalid-historic-consumption";
import { InvalidHistoricConsumptionLenghtError } from "./errors/invalid-historic-lenght";

export interface UnidadeProps {
  valor: Valor;
  codigoDaUnidadeConsumidora: string;
  modeloFasico: ModeloFasico;
  enquadramento: Enquadramento;
  historicoDeConsumoEmKWH: Consumo[];
}

export type EnquadramentoTypes = "AX" | "B1" | "B2" | "B3";

export type ModeloFasicoTypes = "monofasico" | "bifasico" | "trifasico";

export class Unidade extends Entity<UnidadeProps> {
  get valor() {
    return this.props.valor;
  }

  get codigoDaUnidadeConsumidora() {
    return this.props.codigoDaUnidadeConsumidora;
  }

  get modeloFasico() {
    return this.props.modeloFasico;
  }

  get enquadramento() {
    return this.props.enquadramento;
  }

  get historicoDeConsumoEmKWH() {
    return this.props.historicoDeConsumoEmKWH;
  }

  private constructor(props: UnidadeProps, id?: string) {
    super(props, id);
  }

  public static create(
    props: UnidadeProps,
    id?: string
  ): Either<
    InvalidHistoricConsumptionError | InvalidHistoricConsumptionLenghtError,
    Unidade
  > {
    if (!props.historicoDeConsumoEmKWH.length) {
      return left(new InvalidHistoricConsumptionError());
    }
    if (props.historicoDeConsumoEmKWH.length != 12) {
      return left(
        new InvalidHistoricConsumptionLenghtError(
          props.codigoDaUnidadeConsumidora
        )
      );
    }
    return right(new Unidade(props, id));
  }
}
