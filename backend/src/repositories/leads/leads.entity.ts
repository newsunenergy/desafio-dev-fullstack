import { Prisma } from '@prisma/client'
import { BaseEntity } from 'src/schemas'

type Cursor = Prisma.LeadWhereUniqueInput
type Where = Prisma.LeadWhereInput
type OrderBy = Prisma.LeadOrderByWithRelationInput
type Data = Prisma.LeadCreateInput
type Include = Prisma.LeadInclude

export type LeadsEntity = BaseEntity<Cursor, Where, OrderBy, Data, Include> & {
  findLeadByIdWithIncludes: {
    id: string
    include: Prisma.LeadInclude
  }
}
