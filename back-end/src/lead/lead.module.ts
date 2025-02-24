import { Module } from '@nestjs/common';
import { LeadService } from './lead.service';
import { LeadController } from './lead.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lead } from './entities/lead.entity';
import { Unit } from './entities/unit.entity';
import { Consumption } from './entities/consumption.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lead, Unit, Consumption]),
  ],
  providers: [LeadService],
  controllers: [LeadController]
})
export class LeadModule { }
