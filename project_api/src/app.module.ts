import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { SimulacaoModule } from './simulacao/simulacao.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, SimulacaoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
