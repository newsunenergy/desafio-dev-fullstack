import { LeadRepository } from "@/domain/repository-interfaces/lead-repository";

export class GetAllLeadWithFilter {
  constructor(private readonly leadRepo: LeadRepository) {}
  async execute(filter: string) {
    const leadCreated = await this.leadRepo.getAllLeadWithFilter(filter);

    return leadCreated;
  }
}
