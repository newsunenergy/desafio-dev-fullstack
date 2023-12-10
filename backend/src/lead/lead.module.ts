import { Module } from '@nestjs/common';
import { LeadService } from './lead.service';
import { PrismaModule } from 'src/prisma.module';
import { LeadController } from './lead.controller';

@Module({
  imports: [PrismaModule],
  controllers: [LeadController],
  providers: [LeadService],
})
export class LeadModule {}
