import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import multer from 'multer';
import { PdfService } from './pdf.service';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Post('decode')
  @UseInterceptors(FileInterceptor('file', { storage: multer.memoryStorage() }))
  async decode(@UploadedFile() file: Express.Multer.File) {
    if (!file || !file.buffer) {
      return { error: 'file is required' };
    }
    return this.pdfService.decodeInvoiceFromBuffer(
      file.buffer,
      file.originalname,
      file.mimetype,
      file.size,
    );
  }
}
