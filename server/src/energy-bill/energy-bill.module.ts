import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { EnergyBillService } from './energy-bill.service';

@Module({
  imports: [HttpModule],
  providers: [EnergyBillService],
  exports: [EnergyBillService],
})
export class EnergyBillModule {}
