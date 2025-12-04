import { Unidade } from '@prisma/client'
import { UnidadesEntity } from './unidades.entity'

export abstract class UnidadesContract {
  abstract createUnidade(params: UnidadesEntity['create']): Promise<Unidade>
  
}
