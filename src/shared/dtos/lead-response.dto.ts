import { Unidade, Consumo, $Enums } from '@prisma/client'

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

    for (const mesDeConsumo of dto.invoice) {
      const entity: Consumo = {
        id: null,
        mesDoConsumo: mesDeConsumo.mesDoConsumo,
        consumoForaPontaEmKWH: mesDeConsumo.consumoForaPontaEmKWH,
        unidadeCodigo: mesDeConsumo.unidadeCodigo,
      }
      consumoAnual.push(entity)
    }

    return consumoAnual
  }
}
