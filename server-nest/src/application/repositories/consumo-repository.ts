import { Consumo } from '@application/entities/consumo';

export abstract class ConsumoRepository {
  abstract create(consumo: Consumo[]): Promise<void>;
}
