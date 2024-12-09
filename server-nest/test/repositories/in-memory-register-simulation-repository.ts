import { Lead } from '@application/entities/lead';
import { RegisterSimulationRepository } from '@application/repositories/register-simulation-repository';

export class InMemoryRegisterSimulationRepository
  implements RegisterSimulationRepository
{
  public leads: Lead[] = [];

  async create(lead: Lead) {
    this.leads.push(lead);
  }

  async findById(id: string): Promise<Lead | null> {
    const lead = this.leads.find((lead) => lead.id === id);
    return lead || null;
  }

  async findAllWithUnidades(): Promise<Lead[]> {
    return this.leads;
  }
}
