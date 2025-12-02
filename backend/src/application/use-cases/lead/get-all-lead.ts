import { LeadRepository } from "@/domain/repository-interfaces/lead-repository";

export class GetAllLead {
  constructor(private readonly leadRepo: LeadRepository) {}
  async execute() {
    const leadCreated = await this.leadRepo.getAllLead();

    return leadCreated;
  }
}
