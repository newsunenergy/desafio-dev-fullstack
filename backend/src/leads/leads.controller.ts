import {
  Controller,
  Post,
  Get,
  UseInterceptors,
  UploadedFile,
  Body,
  Logger,
  Param,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import multer from 'multer';

import { PdfService } from '../pdf/pdf.service';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { CreateLeadResponseDto } from './dto/create-lead-response.dto';
import { LeadResponseDto } from './dto/lead-response.dto';
import { ValidationError } from 'src/core/errors';

@Controller('leads')
export class LeadsController {
  private readonly logger = new Logger(LeadsController.name);

  constructor(
    private readonly leadService: LeadsService,
    private readonly pdfService: PdfService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', { storage: multer.memoryStorage() }))
  async createLead(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateLeadDto,
  ): Promise<CreateLeadResponseDto> {
    if (!file || !file.buffer) {
      throw new ValidationError({
        message: 'É necessário enviar uma fatura em PDF no campo "file".',
      });
    }

    const processed = await this.pdfService.decodeInvoiceFromBuffer(
      file.buffer,
      file.originalname,
      file.mimetype,
      file.size,
    );

    const consumptionHistory = processed.invoice.map((item) => ({
      consumptionDate: new Date(item.consumptionDate),
      offPeakKwh: item.offPeakKwh,
      peakKwh: item.peakKwh,
    }));

    const result = await this.leadService.create({
      ...body,
      amount: processed.amount,
      barcode: processed.barcode,
      chargingModel: processed.chargingModel,
      phaseModel: processed.phaseModel,
      unitKey: processed.unitKey,
      energyCompanyId: processed.energyCompanyId,
      invoice: consumptionHistory,
    });

    return result;
  }

  @Get()
  async listLeads(
    @Query('name') name?: string,
    @Query('email') email?: string,
    @Query('codigoDaUnidadeConsumidora') codigoDaUnidadeConsumidora?: string,
  ): Promise<LeadResponseDto[]> {
    const filters = {
      ...(name && { name }),
      ...(email && { email }),
      ...(codigoDaUnidadeConsumidora && { codigoDaUnidadeConsumidora }),
    };

    return this.leadService.findAll(filters);
  }

  @Get(':id')
  async getLeadById(@Param('id') id: string): Promise<LeadResponseDto> {
    return this.leadService.findById(id);
  }
}
