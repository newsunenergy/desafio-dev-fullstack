import { faker } from '@faker-js/faker';
import { UniqueEntityID } from '../../src/core/entities/unique-entity-id';
import { Lead } from '../../src/domain/energyCompensation/enterprise/entities/lead';
import {
  LeadWithUnitsDTO,
  UnitWithConsumptionsDTO,
} from '../../src/domain/energyCompensation/application/repositories/lead-repository';
import { Unit } from '../../src/domain/energyCompensation/enterprise/entities/unit';
import { Consumption } from '../../src/domain/energyCompensation/enterprise/entities/consumption';

export function makeLeadWithUnits(
  override: Partial<Lead> = {},
  unitsOverride: Partial<UnitWithConsumptionsDTO>[] = [],
  id?: UniqueEntityID,
): LeadWithUnitsDTO {
  const lead = Lead.create(
    {
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      ...override,
    },
    id,
  );

  const units: UnitWithConsumptionsDTO[] = unitsOverride.length
    ? unitsOverride.map((unit) => ({
        unit: Unit.create({
          consumerUnitCode: unit.unit?.consumerUnitCode ?? faker.string.uuid(),
          phaseModel: unit.unit?.phaseModel ?? 'monofasico',
          framing: unit.unit?.framing ?? 'AX',
        }),
        consumptions: unit.consumptions?.length
          ? unit.consumptions
          : Array.from({ length: 12 }).map(() =>
              Consumption.create({
                offPeakInKWH: faker.number.float({ min: 10, max: 500 }),
                consumptionMonth: faker.date.past(),
              }),
            ),
      }))
    : [
        {
          unit: Unit.create({
            consumerUnitCode: faker.string.uuid(),
            phaseModel: 'monofasico',
            framing: 'AX',
          }),
          consumptions: Array.from({ length: 12 }).map(() =>
            Consumption.create({
              offPeakInKWH: faker.number.float({ min: 10, max: 500 }),
              consumptionMonth: faker.date.past(),
            }),
          ),
        },
      ];

  return { lead, units };
}
