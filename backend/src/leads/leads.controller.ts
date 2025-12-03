import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Logger,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import multer from 'multer';

import { PdfService } from '../pdf/pdf.service';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
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
  ) {
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

    const leadDto = await this.leadService.create({
      ...body,
      amount: processed.amount,
      barcode: processed.barcode,
      chargingModel: processed.chargingModel,
      phaseModel: processed.phaseModel,
      unitKey: processed.unitKey,
      energyCompanyId: processed.energyCompanyId,
    });

    return {
      lead: leadDto,
      invoice: processed.invoice,
    };
  }
}
