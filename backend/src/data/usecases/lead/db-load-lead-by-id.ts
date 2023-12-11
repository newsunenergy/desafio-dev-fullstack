import { LoadLeadByIdRepository } from '@/data/protocols/db/lead/load-lead-by-id'
import { LoadLeadById } from '@/domain/usecases/lead/load-lead-by-id'

export class DbLoadLeadByIdLead implements LoadLeadById {
  constructor (private readonly loadLeadByIdRepository: LoadLeadByIdRepository) { }
  async loadById (params: LoadLeadById.Params): Promise<LoadLeadById.Result> {
    return await this.loadLeadByIdRepository.loadById(params)
  }
}
