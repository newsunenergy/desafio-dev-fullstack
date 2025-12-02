import { Lead } from "@/domain/entities/lead/lead";
import { LeadRepository } from "@/domain/repository-interfaces/lead-repository";

export class GetById {
  constructor(private readonly leadRepo: LeadRepository) {}
  async execute(id: string): Promise<Lead | null> {
    const lead = await this.leadRepo.getById(id);

    return lead;
  }
}
