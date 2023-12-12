import { Repository } from 'src/core/base/repository'
import { PrismaService } from './prisma.service'

export abstract class PrismaRepository extends Repository<any> {
  constructor(protected readonly prisma: PrismaService) {
    super()
  }
}
