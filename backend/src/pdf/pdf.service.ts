import { Injectable, Logger } from '@nestjs/common';
import FormData from 'form-data';
import fetch, { Response } from 'node-fetch';
import { ExternalPdfResponseDto } from './dtos/pdf-response.dto';
import { ConsumptionItemDto } from './dtos/consumption-item.dto';
import { ServiceError, ValidationError } from 'src/core/errors';

@Injectable()
export class PdfService {
  private readonly logger = new Logger(PdfService.name);
  private readonly EXTERNAL_API_URL =
    process.env.MAGIC_PDF_URL ??
    'https://magic-pdf.solarium.newsun.energy/v1/magic-pdf';

  async decodeInvoiceFromBuffer(
    fileBuffer: Buffer,
    filename: string,
    mimetype: string,
    size?: number,
  ) {
    const formData = new FormData();
    formData.append('file', fileBuffer, {
      filename,
      contentType: mimetype,
      knownLength: size,
    });

    let response: Response;
    try {
      response = await fetch(this.EXTERNAL_API_URL, {
        method: 'POST',
        body: formData,
        headers: formData.getHeaders(),
      });
    } catch (err) {
      this.logger.error(
        `Network error when calling external PDF API: ${(err as Error).message}`,
      );
      throw new ServiceError({
        message: 'Erro ao acessar serviço de processamento de faturas.',
      });
    }

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      this.logger.error(
        `External PDF API returned non-ok status ${response.status}: ${text}`,
      );

      throw new ServiceError({
        message: 'Falha ao processar o PDF na API externa.',
      });
    }

    const raw = await response.text();
    this.logger.debug(`Raw response from external PDF API: ${raw}`);

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw) as ExternalPdfResponseDto;
    } catch {
      this.logger.error('External PDF API returned non-JSON response');
      throw new ValidationError({
        message: 'Resposta da API externa em formato inesperado.',
      });
    }

    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      !('valor' in parsed) ||
      !('invoice' in parsed)
    ) {
      this.logger.error(
        'External PDF API response missing required fields',
        parsed as any,
      );
      throw new ValidationError({
        message: 'Dados para decodificação inválidos.',
      });
    }

    const external = parsed as ExternalPdfResponseDto;

    const mapped = {
      amount: external.valor,
      barcode: external.barcode,
      chargingModel: external.chargingModel,
      phaseModel: external.phaseModel,
      unitKey: external.unit_key,
      energyCompanyId: external.energy_company_id,
      invoice: (external.invoice || []).map<ConsumptionItemDto>((i) => ({
        consumptionDate: i.consumo_date,
        offPeakKwh: i.consumo_fp,
        peakKwh: i.consumo_p,
      })),
    };

    return mapped;
  }
}
