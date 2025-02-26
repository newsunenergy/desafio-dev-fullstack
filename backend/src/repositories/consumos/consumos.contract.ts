import { ConsumosEntity } from './consumos.entity'

export abstract class ConsumosContract {
  abstract createManyConsumos(
    params: ConsumosEntity['createManyConsumos'],
  ): Promise<number>
}
