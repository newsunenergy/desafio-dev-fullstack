import {
  Consumo,
  LeadEntity,
  Unidade,
} from 'src/core/domain/entities/lead.entity'

export class LeadDTO {
  valor: number
  barcode: string
  chargingModel: any
  phaseModel: any
  unit_key: string
  invoice: Consumo[]
  energy_company_id: string

  public static mapTo(dto: LeadDTO) {
    const entity = new LeadEntity()
    const unidade = new Unidade()

    unidade.codigoDaUnidadeConsumidora = dto.unit_key
    unidade.enquadramento = dto.chargingModel
    unidade.modeloFasico = dto.phaseModel
    unidade.historicoDeConsumoEmKWH = dto.invoice
    entity.unidades.push(unidade)
    return entity
  }
}
