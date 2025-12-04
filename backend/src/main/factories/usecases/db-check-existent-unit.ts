import { DbCheckExistentUnit } from '@/data/usecases/unit/db-check-existent-lead'
import { CheckExistentUnit } from '@/domain/usecases/units/check-existent-unit'
import { UnitPrismaRepository } from '@/infra/db/prisma/unit-prisma-repository'

export const makeDbExistentUnit = (): CheckExistentUnit => {
  const loadUnitRepository = new UnitPrismaRepository()
  return new DbCheckExistentUnit(loadUnitRepository)
}
