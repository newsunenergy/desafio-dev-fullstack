import { LoadUnitRepository } from '@/data/protocols/db/unit/load-units-repository'
import { CheckExistentUnit } from '@/domain/usecases/units/check-existent-unit'

export class DbCheckExistentUnit implements CheckExistentUnit {
  constructor (private readonly loadUnitRepository: LoadUnitRepository) { }
  async unitExists (params: CheckExistentUnit.Params): Promise<boolean> {
    const existentUnit = await this.loadUnitRepository.load(params)
    if (existentUnit.length > 0) return true
    return false
  }
}
