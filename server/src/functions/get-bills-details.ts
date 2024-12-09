import { eq, sql } from 'drizzle-orm'
import { db } from '../db'
import { consumos, unidades } from '../db/schema'

interface GetBillsDetailsRequest {
  leadId: string
}

export async function getBillsDetails({ leadId }: GetBillsDetailsRequest) {
  const rows = await db
    .select({
      codigoDaUnidadeConsumidora: unidades.codigoDaUnidadeConsumidora,
      enquadramento: unidades.enquadramento,
      modeloFasico: unidades.modeloFasico,
      historicoDeConsumo: sql`
        json_agg(
          json_build_object(
            'consumoEmKWH', ${consumos.consumoForaPontaEmKWH},
            'mes', ${consumos.mesDoConsumo}
          )
          ORDER BY ${consumos.mesDoConsumo} DESC
        )
      `.as('historicoDeConsumo'),
    })
    .from(unidades)
    .innerJoin(consumos, eq(consumos.unidadeId, unidades.id))
    .where(eq(unidades.leadId, leadId))
    .groupBy(
      unidades.codigoDaUnidadeConsumidora,
      unidades.enquadramento,
      unidades.modeloFasico
    )
    .execute()

  return rows
}
