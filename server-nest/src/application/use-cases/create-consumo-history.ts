import { Injectable } from '@nestjs/common';
import { ConsumoRepository } from '@application/repositories/consumo-repository';
import { Consumo } from '@application/entities/consumo';

interface consumoRequest {
  invoice: {
    consumo_fp: number;
    consumo_date: string;
  }[];
  unidadeId: string;
}

@Injectable()
export class CreateConsumoHistoryUseCase {
  constructor(private consumoRepository: ConsumoRepository) {}

  async execute({ invoice, unidadeId }: consumoRequest): Promise<void> {
    const consumos = invoice.map((item) => {
      return new Consumo({
        consumoForaPontaEmKWH: item.consumo_fp,
        mesDoConsumo: item.consumo_date,
        unidadeId: unidadeId,
      });
    });

    await this.consumoRepository.create(consumos);
  }
}
