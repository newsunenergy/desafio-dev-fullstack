import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const leadsCreationSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
})

export class LeadCreationDto extends createZodDto(leadsCreationSchema) {}

const leadsGetSchema = z.object({
  query: z.string().optional(),
})

export class LeadsGetDto extends createZodDto(leadsGetSchema) {}
