import { Injectable } from '@nestjs/common';
import { RegisterSimulationRepository } from '@application/repositories/register-simulation-repository';
import { Lead } from '@application/entities/lead';
import { LeadNotFound } from './errors/lead-not-found';

interface GetLeadByIdRequest {
  leadId: string;
}

interface GetLeadByIdResponse {
  lead: Lead | null;
}

@Injectable()
export class GetLeadByIdUseCase {
  constructor(
    private readonly registerSimulationRepository: RegisterSimulationRepository,
  ) {}

  async execute(request: GetLeadByIdRequest): Promise<GetLeadByIdResponse> {
    const { leadId } = request;

    const lead = await this.registerSimulationRepository.findById(leadId);

    if (!lead) {
      throw new LeadNotFound();
    }

    return { lead };
  }
}
