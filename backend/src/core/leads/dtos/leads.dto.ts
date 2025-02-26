import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const leadsCreationSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
})

export class LeadCreationDto extends createZodDto(leadsCreationSchema) {}

const leadsGetSchema = z.object({
  limit: z
    .string()
    .optional()
    .default('10')
    .transform((v) => Number(v)),
  page: z
    .string()
    .default('1')
    .transform((v) => Number(v)),
  email: z.string().optional(),
  unit_code: z.string().optional(),
})

export class LeadsGetDto extends createZodDto(leadsGetSchema) {}
