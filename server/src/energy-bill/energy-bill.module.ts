import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unidade } from 'src/unidade/entities/unidade.entity';
import { EnergyBillService } from './energy-bill.service';

@Module({
  imports: [TypeOrmModule.forFeature([Unidade]), HttpModule],
  providers: [EnergyBillService],
  exports: [EnergyBillService],
})
export class EnergyBillModule {}
