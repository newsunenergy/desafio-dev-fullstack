import { Injectable } from '@nestjs/common';
import { RegisterSimulationRepository } from '@application/repositories/register-simulation-repository';
import { Lead } from '@application/entities/lead';

interface GetLeadsResponse {
  leads: Lead[];
}

@Injectable()
export class GetLeads {
  constructor(
    private readonly registerSimulationRepository: RegisterSimulationRepository,
  ) {}

  async execute(): Promise<GetLeadsResponse> {
    const leads = await this.registerSimulationRepository.findAllWithUnidades();

    return { leads };
  }
}
