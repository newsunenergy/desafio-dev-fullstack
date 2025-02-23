import { Injectable } from '@nestjs/common';
import {
  FilterProps,
  LeadRepository,
  LeadWithUnitsDTO,
} from '../../../../../src/domain/energyCompensation/application/repositories/lead-repository';
import { PrismaService } from '../prisma.service';
import { PrismaLeadMapper } from '../mappers/prisma-lead-mapper';

@Injectable()
export class PrismaLeadRepository implements LeadRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(leadWithUnits: LeadWithUnitsDTO): Promise<void> {
    const data = PrismaLeadMapper.toPersistence(leadWithUnits);

    await this.prismaService.lead.create({
      data,
      include: {
        units: {
          include: {
            consumptionHistory: true,
          },
        },
      },
    });
  }

  async findAll(filter: FilterProps): Promise<LeadWithUnitsDTO[]> {
    const leads = await this.prismaService.lead.findMany({
      where: {
        fullName: filter.name ? { contains: filter.name } : undefined,
        email: filter.email ? { contains: filter.email } : undefined,
        phone: filter.phone ? { contains: filter.phone } : undefined,
        units: filter.consumerUnitCode
          ? {
              some: { consumerUnitCode: { contains: filter.consumerUnitCode } },
            }
          : undefined,
      },
      include: {
        units: {
          include: {
            consumptionHistory: true,
          },
        },
      },
    });

    return leads.map((lead) =>
      PrismaLeadMapper.toDomain(
        lead,
        lead.units,
        lead.units.flatMap((unit) => unit.consumptionHistory),
      ),
    );
  }

  async findById(id: string): Promise<LeadWithUnitsDTO | null> {
    const lead = await this.prismaService.lead.findUnique({
      where: { id },
      include: {
        units: {
          include: {
            consumptionHistory: true,
          },
        },
      },
    });

    if (!lead) return null;

    return PrismaLeadMapper.toDomain(
      lead,
      lead.units,
      lead.units.flatMap((unit) => unit.consumptionHistory),
    );
  }
}
