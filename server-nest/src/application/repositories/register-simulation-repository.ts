import { Lead } from '@application/entities/lead';

export abstract class RegisterSimulationRepository {
  abstract create(lead: Lead): Promise<void>;
  abstract findById(lead: string): Promise<Lead | null>;
  abstract findAllWithUnidades(): Promise<Lead[]>;
}
