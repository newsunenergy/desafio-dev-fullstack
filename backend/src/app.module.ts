import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma.module';
import { UnitModule } from 'src/unit/unit.module';
import { LeadModule } from 'src/lead/lead.module';

@Module({
  imports: [PrismaModule, UnitModule, LeadModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
