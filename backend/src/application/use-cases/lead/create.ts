import { InvalidEmailError } from "@/domain/entities/lead/errors/invalid-email";
import { Lead } from "@/domain/entities/lead/lead";
import { LeadRepository } from "@/domain/repository-interfaces/lead-repository";
import { UnidadeRepository } from "@/domain/repository-interfaces/unidade-repository";
import { Either, left, right } from "@/domain/shared/either";
import { LeadAlreadyExistsError } from "./errors/lead-already-exists";
import { InvalidPhoneError } from "@/domain/entities/lead/errors/invalid-phone";
import { InvalidUnityError } from "@/domain/entities/lead/errors/invalid-unity-error";
import { InvalidFramingError } from "@/domain/entities/unidade/errors/invalid-framing";
import { InvalidHistoricConsumptionError } from "@/domain/entities/unidade/errors/invalid-historic-consumption";
import { InvalidHistoricConsumptionLenghtError } from "@/domain/entities/unidade/errors/invalid-historic-lenght";
import { InvalidModelError } from "@/domain/entities/unidade/errors/invalid-model";
import { InvalidValueError } from "@/domain/entities/unidade/errors/invalid-value";
import { Email } from "@/domain/value-objects/email";
import { Telefone } from "@/domain/value-objects/telefone";
import { Unidade } from "@/domain/entities/unidade/unidade";
import { Valor } from "@/domain/value-objects/valor";
import { ModeloFasico } from "@/domain/value-objects/modelo-fasico";
import { Enquadramento } from "@/domain/value-objects/enquadramento";
import { Consumo } from "@/domain/value-objects/consumo";

type LeadInput = {
  nomeCompleto: string;
  email: string;
  telefone: string;
  unidades: UnidadeInput[];
};

type UnidadeInput = {
  valor: number;
  codigoDaUnidadeConsumidora: string;
  modeloFasico: string;
  enquadramento: string;
  historicoDeConsumoEmKWH: {
    consumoForaPontaEmKWH: number;
    mesDoConsumo: Date;
  }[];
};

type CreateLeadResponse = Either<
  | InvalidEmailError
  | InvalidPhoneError
  | InvalidUnityError
  | LeadAlreadyExistsError
  | InvalidFramingError
  | InvalidHistoricConsumptionError
  | InvalidHistoricConsumptionLenghtError
  | InvalidModelError
  | InvalidValueError,
  Lead
>;

export class Create {
  constructor(
    private readonly leadRepo: LeadRepository,
    private readonly unidadeRepo: UnidadeRepository
  ) {}
  async execute(input: LeadInput): Promise<CreateLeadResponse> {
    const emailOrError = Email.create(input.email);
    const telefoneOrError = Telefone.create(input.telefone);

    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    if (telefoneOrError.isLeft()) {
      return left(telefoneOrError.value);
    }

    let unidade: Unidade[] = [];

    for (const uni of input.unidades) {
      const valorOrError = Valor.create(uni.valor);
      const modeloOrError = ModeloFasico.create(uni.modeloFasico);
      const enquadramentoOrError = Enquadramento.create(uni.enquadramento);
      const historicoDeConsumoEmKWH = uni.historicoDeConsumoEmKWH.map(
        (consumo) => Consumo.create(consumo)
      );

      if (valorOrError.isLeft()) {
        return left(valorOrError.value);
      }
      if (modeloOrError.isLeft()) {
        return left(modeloOrError.value);
      }
      if (enquadramentoOrError.isLeft()) {
        return left(enquadramentoOrError.value);
      }

      const unidadeOrError = Unidade.create({
        valor: valorOrError.value,
        codigoDaUnidadeConsumidora: uni.codigoDaUnidadeConsumidora,
        enquadramento: enquadramentoOrError.value,
        modeloFasico: modeloOrError.value,
        historicoDeConsumoEmKWH,
      });

      if (unidadeOrError.isLeft()) {
        return left(unidadeOrError.value);
      }

      unidade.push(unidadeOrError.value);
    }

    const leadOrError = Lead.create({
      nomeCompleto: input.nomeCompleto,
      email: emailOrError.value,
      telefone: telefoneOrError.value,
      unidades: unidade,
    });

    if (leadOrError.isLeft()) {
      return left(leadOrError.value);
    }

    const leadCreated = await this.leadRepo.create(leadOrError.value);

    await this.unidadeRepo.create(leadCreated.unidades, leadCreated.id);

    return right(leadCreated);
  }
}
