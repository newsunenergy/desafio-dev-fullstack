import { Lead } from '@prisma/client'
import { LeadsEntity } from './leads.entity'

export abstract class LeadsContract {
  abstract createLead(params: LeadsEntity['create']): Promise<Lead>
  abstract countLeads(params: LeadsEntity['count']): Promise<number>
  abstract findLeadByIdWithIncludes(
    params: LeadsEntity['findLeadByIdWithIncludes'],
  ): Promise<Lead | null>
  abstract findLeads(params: LeadsEntity['getMany']): Promise<Lead[]>
  abstract deleteLead(params: LeadsEntity['deleteById']): Promise<Lead>
}
