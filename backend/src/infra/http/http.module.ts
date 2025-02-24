import { Module } from '@nestjs/common';
import { PrismaModule } from '../database/prisma/prisma.module';
import { CreateLeadUseCase } from '../../../src/domain/energyCompensation/application/use-cases/create-lead';
import { FetchLeadsUseCase } from '../../../src/domain/energyCompensation/application/use-cases/fetch-leads';
import { FetchLeadByEmailUseCase } from '../../../src/domain/energyCompensation/application/use-cases/fetch-lead-by-email';
import { FetchLeadByIdUseCase } from '../../../src/domain/energyCompensation/application/use-cases/fetch-lead-by-id';

@Module({
  controllers: [],
  imports: [PrismaModule],
  providers: [
    CreateLeadUseCase,
    FetchLeadsUseCase,
    FetchLeadByEmailUseCase,
    FetchLeadByIdUseCase,
  ],
})
export class HttpModule {}
