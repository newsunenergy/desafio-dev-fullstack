import { Prisma } from '@prisma/client'
import { BaseEntity } from 'src/schemas'

type Cursor = Prisma.ConsumoWhereUniqueInput
type Where = Prisma.ConsumoWhereInput
type OrderBy = Prisma.ConsumoOrderByWithRelationInput
type Data = Prisma.ConsumoCreateInput
type Include = Prisma.ConsumoInclude

export type ConsumosEntity = BaseEntity<
  Cursor,
  Where,
  OrderBy,
  Data,
  Include
> & {
  createManyConsumos: {
    data: Prisma.ConsumoCreateManyInput[]
  }
}
