import { Unidade } from "@/domain/entities/unidade/unidade";
import { Consumo } from "@/domain/value-objects/consumo";
import { Enquadramento } from "@/domain/value-objects/enquadramento";
import { ModeloFasico } from "@/domain/value-objects/modelo-fasico";
import { Valor } from "@/domain/value-objects/valor";
import {
  Unidade as PersistenceUnidade,
  Consumo as PersistenceConsumo,
} from "@prisma/client";

export class UnidadeMapper {
  static toDomain(
    raw: PersistenceUnidade & { historicoDeConsumoEmKWH: PersistenceConsumo[] }
  ) {
    const valorOrError = Valor.create(raw.valor);
    const modeloFasicoOrError = ModeloFasico.create(raw.modeloFasico);
    const enquadramentoOrError = Enquadramento.create(raw.enquadramento);
    const historicoDeConsumoEmKWH = raw.historicoDeConsumoEmKWH.map((his) =>
      Consumo.create(his)
    );

    if (valorOrError.isLeft()) {
      throw new Error("Valor inválido");
    }

    if (modeloFasicoOrError.isLeft()) {
      throw new Error("Modelo fásico inválido");
    }

    if (enquadramentoOrError.isLeft()) {
      throw new Error("Enquadramento inválido");
    }

    const unidadeOrError = Unidade.create(
      {
        valor: valorOrError.value,
        codigoDaUnidadeConsumidora: raw.codigoDaUnidadeConsumidora,
        enquadramento: enquadramentoOrError.value,
        historicoDeConsumoEmKWH: historicoDeConsumoEmKWH,
        modeloFasico: modeloFasicoOrError.value,
      },
      raw.id
    );

    if (unidadeOrError.isLeft()) {
      throw new Error("Falha na criação da unidade");
    }

    return unidadeOrError.value;
  }

  static async toPersistence(unidade: Unidade) {
    return {
      id: unidade.id,
      valor: unidade.valor.value,
      codigoDaUnidadeConsumidora: unidade.codigoDaUnidadeConsumidora,
      enquadramento: unidade.enquadramento.value,
      modeloFasico: unidade.modeloFasico.value,
      historicoDeConsumoEmKWH: unidade.historicoDeConsumoEmKWH,
    };
  }
}
