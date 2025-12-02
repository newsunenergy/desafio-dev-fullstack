import { Lead } from "@/domain/entities/lead/lead";
import { Email } from "@/domain/value-objects/email";
import { Telefone } from "@/domain/value-objects/telefone";
import {
  Lead as PersistenceLead,
  Unidade as PersistenceUnidade,
  Consumo as PersistenceConsumo,
} from "@prisma/client";
import { UnidadeMapper } from "./unidade-mapper";

export class LeadMapper {
  static toDomain(
    raw: PersistenceLead & {
      unidades: (PersistenceUnidade & {
        historicoDeConsumoEmKWH: PersistenceConsumo[];
      })[];
    }
  ): Lead | null {
    const emailOrError = Email.create(raw.email);
    const telefoneOrError = Telefone.create(raw.telefone);
    const unidades = raw.unidades.map((uni) => UnidadeMapper.toDomain(uni));

    if (emailOrError.isLeft()) {
      throw new Error("Email inválido");
    }

    if (telefoneOrError.isLeft()) {
      throw new Error("Telefone inválido");
    }

    const leadOrError = Lead.create(
      {
        nomeCompleto: raw.nomeCompleto,
        email: emailOrError.value,
        telefone: telefoneOrError.value,
        unidades,
      },
      raw.id
    );

    if (leadOrError.isRight()) {
      return leadOrError.value;
    }

    return null;
  }

  static toPersistence(lead: Lead) {
    return {
      id: lead.id,
      nomeCompleto: lead.nomeCompleto,
      email: lead.email.value,
      telefone: lead.telefone.value,
      unidades: lead.unidades,
    };
  }
}
