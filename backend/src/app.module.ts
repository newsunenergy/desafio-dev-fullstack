import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ConfigModule.forRoot(), ClientsModule],
  providers: [PrismaModule],
})
export class AppModule {}
