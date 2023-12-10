import { Module } from '@nestjs/common';
import { UnitService } from './unit.service';
import { PrismaModule } from 'src/prisma.module';
import { UnitController } from './unit.controller';

@Module({
  imports: [PrismaModule],
  controllers: [UnitController],
  providers: [UnitService],
})
export class UnitModule {}
