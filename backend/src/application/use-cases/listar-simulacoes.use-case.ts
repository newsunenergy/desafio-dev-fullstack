import { Injectable, Inject } from '@nestjs/common';
import type {
  ILeadRepository,
  FiltrosSimulacao,
} from '../../domain/repositories/lead.repository.interface';
import { Lead } from '../../domain/entities/lead.entity';

@Injectable()
export class ListarSimulacoesUseCase {
  constructor(
    @Inject('ILeadRepository') private leadRepository: ILeadRepository,
  ) {}

  async execute(filtros?: FiltrosSimulacao): Promise<Lead[]> {
    return await this.leadRepository.listar(filtros);
  }
}
