import { Lead } from '@application/entities/lead';
import { RegisterSimulationRepository } from '@application/repositories/register-simulation-repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { PrismaRegisterSimulationMapper } from '../mappers/prisma-register-simulation-mapper';

@Injectable()
export class PrismaRegisterSimulationRepository
  implements RegisterSimulationRepository
{
  constructor(private prismaService: PrismaService) {}

  async create(lead: Lead): Promise<void> {
    const raw = PrismaRegisterSimulationMapper.toPrisma(lead);
    await this.prismaService.lead.create({
      data: raw,
    });
  }

  async findById(leadId: string): Promise<Lead | null> {
    const leadData = await this.prismaService.lead.findUnique({
      where: { id: leadId },
      include: {
        unidades: {
          include: {
            historicoDeConsumoEmKWH: true,
          },
        },
      },
    });

    if (!leadData) {
      return null;
    }

    const lead = PrismaRegisterSimulationMapper.toDomain(leadData);
    return lead;
  }

  async findAllWithUnidades(): Promise<Lead[]> {
    const leadsData = await this.prismaService.lead.findMany({
      include: {
        unidades: {
          include: {
            historicoDeConsumoEmKWH: true,
          },
        },
      },
    });

    const leads = leadsData.map((leadData) =>
      PrismaRegisterSimulationMapper.toDomain(leadData),
    );

    return leads;
  }
}
