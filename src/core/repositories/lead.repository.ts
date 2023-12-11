import { Repository } from '../base/repository'
import { LeadEntity } from '../domain/entities/lead.entity'

export abstract class LeadRepository extends Repository<LeadEntity> {}
