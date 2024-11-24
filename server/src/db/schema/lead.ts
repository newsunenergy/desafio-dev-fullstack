import { relations } from 'drizzle-orm'
import { pgTable, uuid, text } from 'drizzle-orm/pg-core'

import { unidades } from './unidade'

export const leads = pgTable('Lead', {
  id: uuid('id').primaryKey().defaultRandom(),
  nomeCompleto: text('nomeCompleto').notNull(),
  email: text('email').notNull().unique(),
  telefone: text('telefone').notNull(),
})

export const leadRelations = relations(leads, ({ many }) => ({
  unidades: many(unidades),
}))
