import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { LeadRepository } from '../../../../src/domain/energyCompensation/application/repositories/lead-repository';
import { PrismaLeadRepository } from './repositories/prisma-lead-repository';

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: LeadRepository,
      useClass: PrismaLeadRepository,
    },
  ],
  exports: [PrismaService, LeadRepository],
})
export class DatabaseModule {}
