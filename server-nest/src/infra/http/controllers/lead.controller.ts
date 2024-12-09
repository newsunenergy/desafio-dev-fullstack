import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CreateLeadBody } from '../dtos/create-lead-body';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { RegisterSimulation } from '@application/use-cases/register-simulation';
import { MagicPdfService } from '@infra/services/magic-pdf.service';
import { CreateUnidadeUseCase } from '@application/use-cases/create-unidade';
import { CreateConsumoHistoryUseCase } from '@application/use-cases/create-consumo-history';
import { GetLeads } from '@application/use-cases/get-leads';
import { GetLeadByIdUseCase } from '@application/use-cases/get-lead-by-id';

@Controller('lead')
export class LeadController {
  constructor(
    private registerSimulation: RegisterSimulation,
    private magicPdfService: MagicPdfService,
    private createUnidadeUseCase: CreateUnidadeUseCase,
    private createConsumoHistoryUseCase: CreateConsumoHistoryUseCase,
    private getLeads: GetLeads,
    private getLeadByIdUseCase: GetLeadByIdUseCase,
  ) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'bills', maxCount: 10 }]))
  async create(
    @Body() createLeadBody: CreateLeadBody,
    @UploadedFiles() files: { bills?: Express.Multer.File[] },
  ) {
    const { bills } = files;
    const { email, nomeCompleto, telefone } = createLeadBody;

    const lead = await this.registerSimulation.execute({
      email,
      telefone,
      name: nomeCompleto,
      bills,
    });

    const processedData = await this.magicPdfService.processBills(bills);

    const unidade = await this.createUnidadeUseCase.execute({
      ...processedData,
      leadId: lead.id,
    });

    await this.createConsumoHistoryUseCase.execute({
      ...processedData,
      unidadeId: unidade.id,
    });

    return { message: 'Lead criado com sucesso!' };
  }

  @Get()
  async getLeadsWithUnidades() {
    const { leads } = await this.getLeads.execute();
    return leads;
  }

  @Get(':id')
  async getLeadById(@Param('id') id: string) {
    const { lead } = await this.getLeadByIdUseCase.execute({ leadId: id });

    if (!lead) {
      throw new Error('Lead not found');
    }

    return lead;
  }
}
