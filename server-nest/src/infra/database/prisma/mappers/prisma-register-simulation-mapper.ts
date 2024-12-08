import { Lead } from '@application/entities/lead';
import { Lead as RawNotification } from '@prisma/client';
import { NomeCompleto } from '@application/entities/lead-nome-completo';

interface RawLead extends RawNotification {
  unidades: {
    id: string;
    codigoDaUnidadeConsumidora: string;
    modeloFasico: string;
    enquadramento: string;
    leadId: string | null;
  }[];
}

export class PrismaRegisterSimulationMapper {
  static toPrisma(lead: Lead) {
    return {
      id: lead.id,
      email: lead.email,
      telefone: lead.telefone,
      nomeCompleto: lead.nomeCompleto.value,
    };
  }

  static toDomain(raw: RawLead) {
    const { id, nomeCompleto, telefone, email, unidades } = raw;

    return new Lead(
      {
        nomeCompleto: new NomeCompleto(nomeCompleto),
        telefone: telefone,
        email: email,
        unidades: unidades,
      },
      id,
    );
  }
}
