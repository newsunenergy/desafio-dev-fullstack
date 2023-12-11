import { AddLeadRepository } from '@/data/protocols/db/lead/add-lead-repository'
import { AddLead } from '@/domain/usecases/lead/add-lead'

export class DbAddLead implements AddLead {
  constructor (private readonly addLeadRepository: AddLeadRepository) {}
  async addLead (params: AddLead.Params): Promise<void> {
    await this.addLeadRepository.add(params)
  }
}
