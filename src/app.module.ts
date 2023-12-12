import { Module } from '@nestjs/common'

import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './infra/prisma/prisma.service'
import { UserController } from './presentation/controller/user.controller'
import { UserService } from './service/user.service'
import { HttpModule } from '@nestjs/axios'
import { LeadController } from './presentation/controller/lead.controller'
import { LeadService } from './service/lead.service'

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [UserController, LeadController],
  providers: [PrismaService, UserService, LeadService],
})
export class AppModule {}
