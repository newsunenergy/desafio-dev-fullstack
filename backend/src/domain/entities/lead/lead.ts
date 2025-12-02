import { Either, left, right } from "../../shared/either";
import { Entity } from "../../shared/entity";
import { Email } from "../../value-objects/email";
import { Telefone } from "../../value-objects/telefone";
import { Unidade } from "../unidade/unidade";
import { InvalidUnityError } from "./errors/invalid-unity-error";

export interface LeadProps {
  nomeCompleto: string;
  email: Email;
  telefone: Telefone;
  unidades: Unidade[];
}

export class Lead extends Entity<LeadProps> {
  get nomeCompleto() {
    return this.props.nomeCompleto;
  }

  get email() {
    return this.props.email;
  }

  get telefone() {
    return this.props.telefone;
  }

  get unidades() {
    return this.props.unidades;
  }

  private constructor(props: LeadProps, id?: string) {
    super(props, id);
  }

  public static create(
    props: LeadProps,
    id?: string
  ): Either<InvalidUnityError, Lead> {
    if (!props.unidades.length) {
      return left(new InvalidUnityError());
    }
    return right(new Lead(props, id));
  }

  toObject() {
    return {
      id: this._id,
      nomeCompleto: this.nomeCompleto,
      email: this.email.value,
      telefone: this.telefone.value,
      unidades: this.unidades.map((uni) => ({
        valor: uni.valor.getCurrencyFormat(),
        codigoDaUnidadeConsumidora: uni.codigoDaUnidadeConsumidora,
        enquadramento: uni.enquadramento.value,
        modeloFasico: uni.modeloFasico.value,
        historicoDeConsumoEmKWH: uni.historicoDeConsumoEmKWH.map((his) => ({
          consumoForaPontaEmKWH: his.consumoForaPontaEmKWH,
          mesDoConsumo: his.mesDoConsumo,
        })),
      })),
    };
  }
}
