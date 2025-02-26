import { Module } from '@nestjs/common'
import { LeadsController } from './leads.controller'
import { LeadsService } from './leads.service'
import { AccountAnalyserService, PrismaService } from 'src/providers'
import {
  LeadsContract,
  LeadsRepository,
  UnidadesContract,
  UnidadesRepository,
  ConsumosContract,
  ConsumosRepository,
} from 'src/repositories'

@Module({
  controllers: [LeadsController],
  providers: [
    LeadsService,
    AccountAnalyserService,
    {
      provide: LeadsContract,
      useClass: LeadsRepository,
    },
    {
      provide: UnidadesContract,
      useClass: UnidadesRepository,
    },
    {
      provide: ConsumosContract,
      useClass: ConsumosRepository,
    },
    PrismaService,
  ],
})
export class LeadsModule {}
