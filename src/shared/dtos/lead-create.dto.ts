import { Lead } from '@prisma/client'

export class CreateLeadDTO {
  constructor(nome: string, email: string, telefone: string) {
    const lead: Lead = {
      id: null,
      nomeCompleto: nome,
      email: email,
      telefone: telefone,
    }
    return lead
  }

  //ublic static mapFrom(leadResponse: LeadResponseDTO) {}
}
