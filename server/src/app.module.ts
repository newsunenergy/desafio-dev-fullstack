import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './config/ormconfig';
import { ConsumoModule } from './consumo/consumo.module';
import { EnergyBillModule } from './energy-bill/energy-bill.module';
import { LeadModule } from './lead/lead.module';
import { UnidadeModule } from './unidade/unidade.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    LeadModule,
    ConsumoModule,
    UnidadeModule,
    EnergyBillModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
