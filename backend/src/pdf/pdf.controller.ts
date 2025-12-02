import { Controller } from '@nestjs/common';
import { Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PdfService } from './pdf.service';
import { PdfResponseDto } from './dtos/pdf-response.dto';
import { ValidationError } from 'src/core/errors';
import { Logger } from '@nestjs/common';
import multer from 'multer';

@Controller('pdf')
export class PdfController {
  private readonly logger = new Logger(PdfController.name);

  constructor(private readonly pdfService: PdfService) {}

  @Post('decode')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.memoryStorage(),
    }),
  )
  async decodeInvoice(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<PdfResponseDto> {
    if (!file) {
      this.logger.error('Nenhum arquivo foi enviado.');
      throw new ValidationError({
        message: 'É necessário enviar uma fatura de energia válida.',
      });
    }

    this.logger.log(`Arquivo recebido: ${file.originalname}`);
    return this.pdfService.decodeInvoice(file);
  }
}
