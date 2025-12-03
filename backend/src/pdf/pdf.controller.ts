import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import multer from 'multer';
import { PdfService } from './pdf.service';
import { ValidationError } from 'src/core/errors';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Post('decode')
  @UseInterceptors(FileInterceptor('file', { storage: multer.memoryStorage() }))
  async decode(@UploadedFile() file: Express.Multer.File) {
    if (!file || !file.buffer) {
      throw new ValidationError({
        message: 'É necessário enviar um arquivo PDF no campo "file".',
      });
    }
    return this.pdfService.decodeInvoiceFromBuffer(
      file.buffer,
      file.originalname,
      file.mimetype,
      file.size,
    );
  }
}
