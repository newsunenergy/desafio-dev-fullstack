import { Unidade } from '@application/entities/unidade';

export abstract class UnidadeRepository {
  abstract create(unidade: Unidade): Promise<void>;
}
