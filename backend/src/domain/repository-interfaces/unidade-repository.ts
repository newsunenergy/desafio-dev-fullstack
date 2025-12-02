import { Unidade } from "../entities/unidade/unidade";

export interface UnidadeRepository {
  create(input: Unidade[], leadId: string): Promise<Unidade[]>;
}
