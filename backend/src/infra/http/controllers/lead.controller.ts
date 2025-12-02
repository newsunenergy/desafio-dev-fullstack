import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { z } from 'zod';
import { InvalidDataValidationPipe } from '../pipes/invalid-data-validation.pipe';
import { LeadPresenter } from '../presenters/lead-presenter';
import { FetchLeadsUseCase } from '../../../../src/domain/energyCompensation/application/use-cases/fetch-leads';
import { CreateLeadUseCase } from '../../../../src/domain/energyCompensation/application/use-cases/create-lead';
import { FetchLeadByIdUseCase } from '../../../../src/domain/energyCompensation/application/use-cases/fetch-lead-by-id';
import { LeadNotFoundException } from '../errors/LeadNotFoundException';
import { FilesInterceptor } from '@nestjs/platform-express';
import { EmailAlreadyTakenBoundToLeadException } from '../errors/EmailAlreadyBoundToLeadException';
import { EnergyBillsDuplicatedException } from '../errors/EnergyBillsDuplicatedException';

const createLeadSchema = z.object({
  name: z.string().trim().min(1, 'O nome completo é obrigatório'),
  email: z.string().trim().email('Email inválido'),
  phone: z.string().trim().min(10, 'Número de telefone inválido'),
});

type CreateLeadSchemaType = z.infer<typeof createLeadSchema>;

@Controller('/lead')
export class LeadController {
  constructor(
    private readonly fetchLeadsUseCase: FetchLeadsUseCase,
    private readonly createLeadUseCase: CreateLeadUseCase,
    private readonly fetchLeadByIdUseCase: FetchLeadByIdUseCase,
  ) {}

  @Post('/')
  @HttpCode(201)
  @UseInterceptors(FilesInterceptor('files', 5))
  async createLead(
    @Body(new InvalidDataValidationPipe(createLeadSchema))
    body: CreateLeadSchemaType,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const { name, email, phone } = body;

    const fileNames = new Set<string>();

    for (const file of files) {
      if (fileNames.has(file.originalname)) {
        throw new EnergyBillsDuplicatedException(
          `Existem contas de energia duplicadas, verifique os arquivos enviados.`,
        );
      }
      fileNames.add(file.originalname);
    }

    const result = await this.createLeadUseCase.execute({
      name,
      email,
      phone,
      bills: files,
    });

    if (result.isLeft()) {
      const error = result.value;
      if (error.message === '409') {
        throw new EmailAlreadyTakenBoundToLeadException(
          'Email já está vinculado a uma lead',
        );
      }
    }

    return { success: true };
  }

  @Get('/')
  @HttpCode(200)
  async fetchLeads(
    @Query('name') name?: string,
    @Query('email') email?: string,
    @Query('phone') phone?: string,
    @Query('consumerUnitCode') consumerUnitCode?: string,
  ) {
    const result = await this.fetchLeadsUseCase.execute({
      name,
      email,
      phone,
      consumerUnitCode,
    });

    if (result.isLeft()) {
      return { leads: [] };
    }

    const { leadWithUnits } = result.value;

    return {
      leads: leadWithUnits.map((lead) => LeadPresenter.toHTTP(lead)),
    };
  }

  @Get('/:id')
  @HttpCode(200)
  async fetchLeadById(@Param('id') id: string) {
    const result = await this.fetchLeadByIdUseCase.execute({ id });

    if (result.isLeft()) {
      throw new LeadNotFoundException('Lead não encontrado');
    }

    const { leadWithUnits } = result.value;

    return LeadPresenter.toHTTP(leadWithUnits);
  }
}
