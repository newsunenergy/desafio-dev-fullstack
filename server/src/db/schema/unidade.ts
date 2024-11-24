import { relations } from 'drizzle-orm'
import { pgTable, text, uuid } from 'drizzle-orm/pg-core'

import { consumos } from './consumo'
import { leads } from './lead'

export const unidades = pgTable('Unidade', {
  id: uuid('id').primaryKey().defaultRandom(),
  codigoDaUnidadeConsumidora: text('codigoDaUnidadeConsumidora')
    .notNull()
    .unique(),
  modeloFasico: text('modeloFasico').notNull(),
  enquadramento: text('enquadramento').notNull(),
  leadId: uuid('leadId').notNull(),
})

export const unidadeRelations = relations(unidades, ({ one }) => ({
  lead: one(leads, {
    fields: [unidades.leadId],
    references: [leads.id],
  }),
}))

export const unidadeConsumoRelations = relations(unidades, ({ many }) => ({
  historicoDeConsumoEmKWH: many(consumos),
}))
