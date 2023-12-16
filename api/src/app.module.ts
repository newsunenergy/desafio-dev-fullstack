import { Module } from '@nestjs/common'

import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './infra/prisma/prisma.service'
import { HttpModule } from '@nestjs/axios'
import { LeadController } from './presentation/controller/lead.controller'
import { LeadService } from './service/lead.service'
import { MulterModule } from '@nestjs/platform-express'
import { ConsumoService } from './service/consumo.service'
import { UnidadeService } from './service/unidade.service'

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [LeadController],
  providers: [PrismaService, LeadService, ConsumoService, UnidadeService],
})
export class AppModule {}
