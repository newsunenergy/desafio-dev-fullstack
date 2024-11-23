import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { SimulationService } from './simulation.service';
import { SimulationController } from './simulation.controller';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { SimulationRepository } from './simulation.repository';

@Module({
  imports: [PrismaModule, NestjsFormDataModule],
  controllers: [SimulationController],
  providers: [SimulationService, SimulationRepository],
})
export class SimulationModule {}
