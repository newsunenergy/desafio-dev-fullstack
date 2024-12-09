import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { LeadController } from './controllers/lead.controller';
import { RegisterSimulation } from '@application/use-cases/register-simulation';
import { MagicPdfService } from '@infra/services/magic-pdf.service';
import { CreateUnidadeUseCase } from '@application/use-cases/create-unidade';
import { CreateConsumoHistoryUseCase } from '@application/use-cases/create-consumo-history';
import { GetLeads } from '@application/use-cases/get-leads';
import { GetLeadByIdUseCase } from '@application/use-cases/get-lead-by-id';

@Module({
  imports: [DatabaseModule],
  controllers: [LeadController],
  providers: [
    RegisterSimulation,
    MagicPdfService,
    CreateUnidadeUseCase,
    CreateConsumoHistoryUseCase,
    GetLeads,
    GetLeadByIdUseCase,
  ],
})
export class HttpModule {}
