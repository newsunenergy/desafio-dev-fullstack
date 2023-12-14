import { Lead } from '@prisma/client'
import { randomUUID } from 'crypto'

export class CreateLeadDTO {
  constructor(nome: string, email: string, telefone: string) {
    const lead: Lead = {
      id: randomUUID(),
      nomeCompleto: nome,
      email: email,
      telefone: telefone,
    }
    return lead
  }

  //ublic static mapFrom(leadResponse: LeadResponseDTO) {}
}
