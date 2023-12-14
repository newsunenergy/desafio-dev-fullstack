import { Lead } from '@prisma/client'

export class UserDataDTO {
  nomeCompleto: string
  email: string
  telefone: string

  public mapToLead() {
    const entity: Lead = {
      id: null,
      nomeCompleto: this.nomeCompleto,
      email: this.email,
      telefone: this.telefone,
    }
    return entity
  }
}
