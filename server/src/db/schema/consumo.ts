import { relations } from 'drizzle-orm'
import { pgTable, timestamp, uuid, numeric, unique } from 'drizzle-orm/pg-core'

import { unidades } from './unidade'

export const consumos = pgTable(
  'Consumo',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    consumoForaPontaEmKWH: numeric('consumoForaPontaEmKWH').notNull(),
    mesDoConsumo: timestamp('mesDoConsumo').notNull(),
    unidadeId: uuid('unidadeId').notNull(),
  },
  table => ({
    uniqueUnidadeMes: unique().on(table.unidadeId, table.mesDoConsumo),
  })
)

export const consumoRelations = relations(consumos, ({ one }) => ({
  unidade: one(unidades, {
    fields: [consumos.unidadeId],
    references: [unidades.id],
  }),
}))
