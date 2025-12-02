import { Lead } from "@/domain/entities/lead/lead";
import { LeadRepository } from "@/domain/repository-interfaces/lead-repository";
import prisma from "../database/prisma";
import { LeadMapper } from "@/application/mappers/lead-mapper";

export class LeadPrismaRepository implements LeadRepository {
  async create(input: Lead) {
    const lead = LeadMapper.toPersistence(input);

    await prisma.lead.create({
      data: {
        id: lead.id,
        email: lead.email,
        telefone: lead.telefone,
        nomeCompleto: lead.nomeCompleto,
      },
    });

    return input;
  }

  async exists(email: string) {
    const lead = await prisma.lead.findUnique({
      where: {
        email,
      },
      include: {
        unidades: {
          include: {
            historicoDeConsumoEmKWH: true,
          },
        },
      },
    });

    if (!lead) return null;

    return LeadMapper.toDomain(lead);
  }

  async getById(id: string) {
    const lead = await prisma.lead.findUnique({
      where: {
        id,
      },
      include: {
        unidades: {
          include: {
            historicoDeConsumoEmKWH: true,
          },
        },
      },
    });

    if (!lead) return null;

    return LeadMapper.toDomain(lead);
  }

  async getAllLeadWithFilter(filter: string) {
    const leads = await prisma.lead.findMany({
      where: {
        OR: [
          {
            email: {
              contains: filter,
              mode: "insensitive",
            },
          },
          {
            nomeCompleto: {
              contains: filter,
              mode: "insensitive",
            },
          },
          {
            unidades: {
              some: {
                codigoDaUnidadeConsumidora: filter,
              },
            },
          },
        ],
      },
      include: {
        unidades: {
          include: {
            historicoDeConsumoEmKWH: true,
          },
        },
      },
    });

    return leads.map((lead) => LeadMapper.toDomain(lead)!);
  }

  async getAllLead() {
    const leads = await prisma.lead.findMany({
      include: {
        unidades: {
          include: {
            historicoDeConsumoEmKWH: true,
          },
        },
      },
    });

    return leads.map((lead) => LeadMapper.toDomain(lead)!);
  }
}
