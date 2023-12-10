import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'src/prisma.module';
import { UnitModule } from 'src/unit/unit.module';
import { LeadModule } from 'src/lead/lead.module';

@Module({
  imports: [PrismaModule, UnitModule, LeadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
