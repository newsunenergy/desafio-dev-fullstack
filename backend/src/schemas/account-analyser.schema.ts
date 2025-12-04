import { Enquadramento, ModeloFasico } from '@prisma/client'
import { z } from 'zod'

const invoiceSchema = z.object({
  consumo_fp: z.number(),
  consumo_date: z.string().datetime(),
})

export const accountAnalysisSchema = z.object({
  valor: z.number(),
  barcode: z.string(),
  chargingModel: z.nativeEnum(Enquadramento),
  phaseModel: z.nativeEnum(ModeloFasico),
  unit_key: z.string(),
  invoice: z.array(invoiceSchema),
  energy_company_id: z.string().uuid(),
})

export type AccountAnalysis = z.infer<typeof accountAnalysisSchema>
