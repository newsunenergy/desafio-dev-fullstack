import { Injectable, Logger } from '@nestjs/common';
import { PdfResponseDto } from './dtos/pdf-response.dto';
import { Lead } from '../leads/entities/lead.entity';
import { Unit } from '../leads/entities/unit.entity';
import FormData from 'form-data';
import fetch, { Response } from 'node-fetch';
import {
  ServiceError,
  ValidationError,
  InternalServerError,
} from 'src/core/errors';

@Injectable()
export class PdfService {
  private readonly logger = new Logger(PdfService.name);
  private readonly EXTERNAL_API_URL =
    'https://magic-pdf.solarium.newsun.energy/v1/magic-pdf';

  async decodeInvoice(file: Express.Multer.File): Promise<PdfResponseDto> {
    try {
      const formData = new FormData();
      formData.append('file', file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });

      const response = await fetch(this.EXTERNAL_API_URL, {
        method: 'POST',
        body: formData,
        headers: formData.getHeaders(),
      });

      if (!response.ok) {
        throw new ServiceError({
          message: `Falha ao decodificar PDF: ${response.status} - ${response.statusText}`,
        });
      }

      const raw = await response.text();
      this.logger.debug(`Resposta bruta da API externa: ${raw}`);

      let parsed: unknown;
      try {
        parsed = JSON.parse(raw);
      } catch {
        throw new ValidationError({
          message: `A API retornou dados que não são JSON.`,
        });
      }

      if (
        typeof parsed !== 'object' ||
        parsed === null ||
        !('valor' in parsed) ||
        !('invoice' in parsed)
      ) {
        throw new ValidationError({
          message: `Dados de fatura retornaram em formato inesperado.`,
        });
      }

      return parsed as PdfResponseDto;
    } catch (error) {
      if (error instanceof ServiceError || error instanceof ValidationError) {
        this.logger.error(`[PdfService] ${error.message}`);
        throw error;
      }

      if (error instanceof Error) {
        this.logger.error(
          `[PdfService] Erro inesperado ao chamar API externa: ${error.message}`,
        );
        throw new ServiceError({
          message: `Erro inesperado ao chamar API externa: ${error.message}`,
        });
      }

      this.logger.error('[PdfService] Erro desconhecido');
      throw new InternalServerError({ statusCode: 500 });
    }
  }

  transformToDomainEntities(decoded: PdfResponseDto): Lead {
    const units: Unit[] = [
      {
        id: decoded.energy_company_id,
        consumer_unit_code: decoded.unit_key,
        phase_model: decoded.phaseModel,
        framework: decoded.chargingModel,
        lead: new Lead(),
        lead_id: '',
        created_at: new Date(),
        updated_at: new Date(),

        consumptions: decoded.invoice.map((item) => ({
          id: '',
          off_peak_consumption_kwh: item.consumo_fp,
          peak_consumption_kwh: item.consumo_p,
          consumption_month: new Date(item.consumo_date),
          unit: new Unit(),
          unit_id: '',
          created_at: new Date(),
        })),
      },
    ];

    return {
      id: '',
      full_name: '',
      email: '',
      phone: '',
      created_at: new Date(),
      updated_at: new Date(),
      units,
    };
  }
}
