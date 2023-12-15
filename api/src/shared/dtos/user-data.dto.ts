import { Lead } from '@prisma/client'
import { randomUUID } from 'crypto'

export class UserDataDTO {
  id?: string //remover
  nomeCompleto: string
  email: string
  telefone: string

  public static mapToLead(dto: UserDataDTO) {
    const entity: Lead = {
      id: randomUUID(),
      nomeCompleto: dto.nomeCompleto,
      email: dto.email,
      telefone: dto.telefone,
    }
    return entity
  }
}
