import { db } from '../db'
import { eq } from 'drizzle-orm'
import { consumos, leads, unidades } from '../db/schema'

interface ApiResponse {
  unit_key: string
  phaseModel: string
  chargingModel: string
  invoice: {
    consumo_fp: number
    consumo_date: string // formato ISO
  }[]
}

export async function saveSimulationData(
  leadData: { nomeCompleto: string; email: string; telefone: string },
  apiResponse: ApiResponse
) {
  const { nomeCompleto, email, telefone } = leadData
  const { unit_key, phaseModel, chargingModel, invoice } = apiResponse

  const existingLead = await db
    .select({ id: leads.id })
    .from(leads)
    .where(eq(leads.email, email))
    .limit(1)

  if (existingLead.length > 0) {
    throw new Error('O email já está registrado.')
  }

  const [lead] = await db
    .insert(leads)
    .values({ nomeCompleto, email, telefone })
    .onConflictDoNothing({ target: leads.email })
    .returning()

  if (!lead) {
    throw new Error('Erro ao salvar o lead.')
  }

  const existingUnit = await db
    .select({ id: unidades.id })
    .from(unidades)
    .where(eq(unidades.codigoDaUnidadeConsumidora, unit_key))
    .limit(1)

  if (existingUnit.length > 0) {
    throw new Error('O código da unidade já está registrado.')
  }

  const [unidade] = await db
    .insert(unidades)
    .values({
      codigoDaUnidadeConsumidora: unit_key,
      modeloFasico: phaseModel,
      enquadramento: chargingModel,
      leadId: lead.id,
    })
    .onConflictDoNothing({ target: unidades.codigoDaUnidadeConsumidora })
    .returning()

  if (!unidade) {
    throw new Error('Erro ao salvar a unidade.')
  }

  if (!unidade.id) {
    throw new Error('O lead deve ter pelo menos uma unidade.')
  }

  for (const { consumo_fp, consumo_date } of invoice) {
    const mesDoConsumo = new Date(consumo_date)

    await db
      .insert(consumos)
      .values({
        consumoForaPontaEmKWH: consumo_fp.toString(),
        mesDoConsumo,
        unidadeId: unidade.id,
      })
      .onConflictDoNothing({
        target: [consumos.unidadeId, consumos.mesDoConsumo],
      })
  }

  return { message: 'Simulação salva com sucesso!' }
}
