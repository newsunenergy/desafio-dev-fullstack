import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';
import {
  Prisma,
  Lead as PrismaLead,
  Unit as PrismaUnit,
  Consumption as PrismaConsumption,
} from '@prisma/client';
import { Lead } from '../../../../../src/domain/energyCompensation/enterprise/entities/lead';
import { Unit } from '../../../../../src/domain/energyCompensation/enterprise/entities/unit';
import { Consumption } from '../../../../../src/domain/energyCompensation/enterprise/entities/consumption';
import {
  LeadWithUnitsDTO,
  UnitWithConsumptionsDTO,
} from '../../../../../src/domain/energyCompensation/application/repositories/lead-repository';

export class PrismaLeadMapper {
  static toDomain(
    leadRaw: PrismaLead,
    unitsRaw: PrismaUnit[],
    consumptionsRaw: PrismaConsumption[],
  ): LeadWithUnitsDTO {
    const unitsWithConsumptions: UnitWithConsumptionsDTO[] = unitsRaw.map(
      (unit) => {
        const consumptions = consumptionsRaw
          .filter((consumption) => consumption.unitId === unit.id)
          .map((consumption) =>
            Consumption.create(
              {
                offPeakInKWH: consumption.offPeakInKWH,
                consumptionMonth: consumption.consumptionMonth,
                unitId: consumption.unitId,
                createdAt: consumption.createdAt,
                updatedAt: consumption.updatedAt,
              },
              new UniqueEntityID(consumption.id),
            ),
          );

        const unitEntity = Unit.create(
          {
            consumerUnitCode: unit.consumerUnitCode,
            framing: unit.framing,
            phaseModel: unit.phaseModel,
            leadId: unit.leadId,
            createdAt: unit.createdAt,
            updatedAt: unit.updatedAt,
          },
          new UniqueEntityID(unit.id),
        );

        return {
          unit: unitEntity,
          consumptions,
        };
      },
    );

    const leadEntity = Lead.create(
      {
        fullName: leadRaw.fullName,
        email: leadRaw.email,
        phone: leadRaw.phone,
        createdAt: leadRaw.createdAt,
        updatedAt: leadRaw.updatedAt,
      },
      new UniqueEntityID(leadRaw.id),
    );

    return {
      lead: leadEntity,
      units: unitsWithConsumptions,
    };
  }

  static toPersistence(
    leadWithUnits: LeadWithUnitsDTO,
  ): Prisma.LeadUncheckedCreateInput {
    return {
      id: leadWithUnits.lead.id.toString(),
      fullName: leadWithUnits.lead.fullName,
      email: leadWithUnits.lead.email,
      phone: leadWithUnits.lead.phone,
      createdAt: leadWithUnits.lead.createdAt,
      updatedAt: leadWithUnits.lead.updatedAt ?? undefined,
      units: {
        create: leadWithUnits.units.map(({ unit, consumptions }) => ({
          id: unit.id.toString(),
          consumerUnitCode: unit.consumerUnitCode,
          framing: unit.framing,
          phaseModel: unit.phaseModel,
          createdAt: unit.createdAt,
          updatedAt: unit.updatedAt ?? undefined,
          consumptionHistory: {
            create: consumptions.map((consumption) => ({
              id: consumption.id.toString(),
              offPeakInKWH: consumption.offPeakInKWH,
              consumptionMonth: consumption.consumptionMonth,
              createdAt: consumption.createdAt,
              updatedAt: consumption.updatedAt ?? undefined,
            })),
          },
        })),
      },
    };
  }
}
