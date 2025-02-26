import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/providers'
import { LeadsContract } from './leads.contract'
import { Lead } from '@prisma/client'
import { LeadsEntity } from './leads.entity'

@Injectable()
export class LeadsRepository implements LeadsContract {
  constructor(private readonly prisma: PrismaService) {}
  countLeads(params: LeadsEntity['count']): Promise<number> {
    return this.prisma.lead.count(params)
  }
  deleteLead(params: LeadsEntity['deleteById']): Promise<Lead> {
    return this.prisma.lead.delete({
      where: {
        id: params.id,
      },
    })
  }
  findLeadByIdWithIncludes(
    params: LeadsEntity['findLeadByIdWithIncludes'],
  ): Promise<Lead | null> {
    return this.prisma.lead.findUnique({
      where: {
        id: params.id,
      },
      include: params.include,
    })
  }

  createLead(params: LeadsEntity['create']): Promise<Lead> {
    return this.prisma.lead.create({ data: params.data })
  }

  findLeads(params: LeadsEntity['getMany']): Promise<Lead[]> {
    return this.prisma.lead.findMany(params)
  }
}
