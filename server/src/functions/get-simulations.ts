import { eq, ilike, and, type SQL } from 'drizzle-orm'
import { db } from '../db'
import { leads, unidades } from '../db/schema'

interface Filters {
  nome?: string
  email?: string
  codigoDaUnidadeConsumidora?: string
}

export async function getSimulations(filters: Filters) {
  try {
    const query = db
      .select({
        id: leads.id,
        nomeCompleto: leads.nomeCompleto,
        email: leads.email,
        telefone: leads.telefone,
        codigoDaUnidadeConsumidora: unidades.codigoDaUnidadeConsumidora,
      })
      .from(leads)
      .innerJoin(unidades, eq(unidades.leadId, leads.id))
      .groupBy(leads.id, unidades.codigoDaUnidadeConsumidora)

    const conditions: SQL[] = []

    if (filters.nome) {
      conditions.push(ilike(leads.nomeCompleto, `%${filters.nome}%`))
    }

    if (filters.email) {
      conditions.push(ilike(leads.email, `%${filters.email}%`))
    }

    if (filters.codigoDaUnidadeConsumidora) {
      conditions.push(
        ilike(
          unidades.codigoDaUnidadeConsumidora,
          `%${filters.codigoDaUnidadeConsumidora}%`
        )
      )
    }

    if (conditions.length > 0) {
      query.where(and(...conditions))
    }

    // Executa a consulta
    const simulations = await query.execute()

    const result = simulations.map(simulacao => ({
      lead: {
        id: simulacao.id,
        nomeCompleto: simulacao.nomeCompleto,
        email: simulacao.email,
        telefone: simulacao.telefone,
      },
      codigoDaUnidadeConsumidora: simulacao.codigoDaUnidadeConsumidora,
    }))

    return { simulations: result }
  } catch (error) {
    console.error('Erro ao recuperar simulações:', error)
    return { simulations: [] }
  }
}
