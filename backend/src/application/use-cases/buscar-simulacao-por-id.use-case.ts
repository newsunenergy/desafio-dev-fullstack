import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import type { ILeadRepository } from '../../domain/repositories/lead.repository.interface';
import { Lead } from '../../domain/entities/lead.entity';

@Injectable()
export class BuscarSimulacaoPorIdUseCase {
  constructor(
    @Inject('ILeadRepository') private leadRepository: ILeadRepository,
  ) {}

  async execute(id: string): Promise<Lead> {
    const lead = await this.leadRepository.buscarPorId(id);

    if (!lead) {
      throw new NotFoundException(`Simulação com ID ${id} não encontrada`);
    }

    return lead;
  }
}
