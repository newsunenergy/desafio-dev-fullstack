import { AddLeadRepository } from '@/data/protocols/db/lead/add-lead-repository'
import prisma from './client'

export class LeadPrismaRepository implements AddLeadRepository {
  async add (params: AddLeadRepository.Params): Promise<void> {
  };
}
