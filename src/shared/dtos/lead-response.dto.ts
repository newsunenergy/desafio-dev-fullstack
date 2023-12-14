import { Unidade, Consumo, $Enums } from '@prisma/client'
import { log } from 'console'
import { randomUUID } from 'crypto'

export class LeadResponseDTO {
  valor: number
  barcode: string
  chargingModel: $Enums.TipoEnquadramento
  phaseModel: $Enums.TipoModeloFasico
  unit_key: string
  invoice: Consumo[]
  energy_company_id: string

  public static mapToUnidade(dto: LeadResponseDTO) {
    const entity: Unidade = {
      leadId: null,
      codigoDaUnidadeConsumidora: dto.unit_key,
      modeloFasico: dto.phaseModel,
      enquadramento: dto.chargingModel,
    }
    return entity
  }

  public static mapToConsumo(dto: LeadResponseDTO) {
    const consumoAnual: Consumo[] = []

    for (const mes of dto.invoice) {
      const entity: Consumo = {
        id: randomUUID(),
        mesDoConsumo: mes['consumo_date'],
        consumoForaPontaEmKWH: mes['consumo_fp'],
        unidadeCodigo: mes['unit_key'],
      }
      consumoAnual.push(entity)
    }

    return consumoAnual
  }
}
