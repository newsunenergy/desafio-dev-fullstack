import { Lead } from '@application/entities/lead';
import { NomeCompleto } from '@application/entities/lead-nome-completo';
import { RegisterSimulationRepository } from '@application/repositories/register-simulation-repository';
import { Injectable } from '@nestjs/common';

interface registerSimulationRequest {
  name: string;
  email: string;
  telefone: string;
  bills: Express.Multer.File[];
}

type registerSimulationResponse = Lead;

@Injectable()
export class RegisterSimulation {
  constructor(
    private registerSimulationRepository: RegisterSimulationRepository,
  ) {}

  async execute(
    request: registerSimulationRequest,
  ): Promise<registerSimulationResponse> {
    const { name, email, telefone } = request;

    const lead = new Lead({
      nomeCompleto: new NomeCompleto(name),
      email,
      telefone,
    });

    await this.registerSimulationRepository.create(lead);

    return lead;
  }
}
