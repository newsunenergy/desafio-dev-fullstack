import { LoadLeadRepository } from '@/data/protocols/db/lead/load-lead-repository'
import { LoadLeads } from '@/domain/usecases/lead/load-leads'

export class DbLoadLeadsLead implements LoadLeads {
  constructor (private readonly loadLeadsRepository: LoadLeadRepository) { }
  async load (params: LoadLeads.Params): Promise<LoadLeads.Result> {
    return await this.loadLeadsRepository.load(params)
  }
}
