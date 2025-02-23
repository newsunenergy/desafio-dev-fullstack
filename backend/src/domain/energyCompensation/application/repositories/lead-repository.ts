import { Consumption } from '../../enterprise/entities/consumption';
import { Lead } from '../../enterprise/entities/lead';
import { Unit } from '../../enterprise/entities/unit';

export interface FilterProps {
  name?: string;
  email?: string;
  phone?: string;
  consumerUnitCode?: string;
}

export interface LeadWithUnitsDTO {
  lead: Lead;
  units: UnitWithConsumptionsDTO[];
}

export interface UnitWithConsumptionsDTO {
  unit: Unit;
  consumptions: Consumption[];
}

export abstract class LeadRepository {
  abstract create(lead: LeadWithUnitsDTO): Promise<void>;
  abstract findAll(filter: FilterProps): Promise<LeadWithUnitsDTO[] | null>;
  abstract findById(id: string): Promise<LeadWithUnitsDTO | null>;
}
