import { Injectable } from '@nestjs/common';
import { UnidadeRepository } from '@application/repositories/unidade-repository';
import { Unidade } from '@application/entities/unidade';

interface registerSimulationRequest {
  valor: number;
  barcode: string;
  chargingModel: 'AX' | 'B1' | 'B2' | 'B3';
  phaseModel: 'monofasico' | 'bifasico' | 'trifasico';
  unit_key: string;
  invoice: {
    consumo_fp: number;
    consumo_date: string;
  }[];
  energy_company_id: string;
  leadId: string;
}

@Injectable()
export class CreateUnidadeUseCase {
  constructor(private unidadeRepository: UnidadeRepository) {}

  async execute(processedData: registerSimulationRequest): Promise<Unidade> {
    const unidade = new Unidade({
      codigoDaUnidadeConsumidora: processedData.unit_key,
      modeloFasico: processedData.phaseModel,
      enquadramento: processedData.chargingModel,
      leadId: processedData.leadId,
    });

    await this.unidadeRepository.create(unidade);

    return unidade;
  }
}
