import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsumoService } from 'src/consumo/consumo.service';
import { Consumo } from 'src/consumo/entities/consumo.entity';
import { EnergyBillService } from 'src/energy-bill/energy-bill.service';
import { Unidade } from 'src/unidade/entities/unidade.entity';
import { UnidadeService } from 'src/unidade/unidade.service';
import { Lead } from './entities/lead.entity';
import { LeadController } from './lead.controller';
import { LeadService } from './lead.service';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Lead, Unidade, Consumo])],
  controllers: [LeadController],
  providers: [LeadService, UnidadeService, ConsumoService, EnergyBillService],
})
export class LeadModule {}
