import { LoadLeadRepository } from '@/data/protocols/db/lead/load-lead-repository'
import { CheckExistentLead } from '@/domain/usecases/lead/check-existent-lead'

export class DbCheckExistentLead implements CheckExistentLead {
  constructor (private readonly loadLeadRepository: LoadLeadRepository) { }
  async leadExists (params: CheckExistentLead.Params): Promise<boolean> {
    const existentLead = await this.loadLeadRepository.load(params)
    if (existentLead) return true
    return false
  }
}
