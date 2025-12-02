/* eslint-disable @typescript-eslint/require-await */
import {
  FilterProps,
  LeadRepository,
  LeadWithUnitsDTO,
} from '../../src/domain/energyCompensation/application/repositories/lead-repository';

export class InMemoryLeadRepository implements LeadRepository {
  public items: LeadWithUnitsDTO[] = [];

  async create(lead: LeadWithUnitsDTO): Promise<void> {
    this.items.push(lead);
  }

  async findAll(filter: FilterProps): Promise<LeadWithUnitsDTO[]> {
    return this.items.filter((leadWithUnits) => {
      const { lead, units } = leadWithUnits;

      const matchesName = filter.name
        ? lead.fullName.toLowerCase().includes(filter.name.toLowerCase())
        : true;
      const matchesEmail = filter.email
        ? lead.email.toLowerCase().includes(filter.email.toLowerCase())
        : true;
      const matchesPhone = filter.phone
        ? lead.phone.toLowerCase().includes(filter.phone.toLowerCase())
        : true;
      const matchesConsumerUnitCode = filter.consumerUnitCode
        ? units.some((unitWithConsumptions) =>
            unitWithConsumptions.unit.consumerUnitCode
              .toLowerCase()
              .includes(filter.consumerUnitCode.toLowerCase()),
          )
        : true;

      return (
        matchesName && matchesEmail && matchesPhone && matchesConsumerUnitCode
      );
    });
  }

  async findById(id: string): Promise<LeadWithUnitsDTO | null> {
    return this.items.find((lead) => lead.lead.id.toString() === id) || null;
  }

  async findByEmail(email: string): Promise<LeadWithUnitsDTO | null> {
    return this.items.find((lead) => lead.lead.email === email) || null;
  }
}
