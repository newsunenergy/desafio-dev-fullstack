import { Lead } from "../entities/lead/lead";

export interface LeadRepository {
  create(input: Lead): Promise<Lead>;
  exists(email: string): Promise<Lead | null>;
  getById(id: string): Promise<Lead | null>;
  getAllLeadWithFilter(filter: string): Promise<Lead[]>;
  getAllLead(): Promise<Lead[]>;
}
