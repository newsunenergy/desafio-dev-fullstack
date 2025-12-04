import { Prisma } from '@prisma/client'
import { BaseEntity } from 'src/schemas'

type Cursor = Prisma.UnidadeWhereUniqueInput
type Where = Prisma.UnidadeWhereInput
type OrderBy = Prisma.UnidadeOrderByWithRelationInput
type Data = Prisma.UnidadeCreateInput
type Include = Prisma.UnidadeInclude

export type UnidadesEntity = BaseEntity<
  Cursor,
  Where,
  OrderBy,
  Data,
  Include
> 
