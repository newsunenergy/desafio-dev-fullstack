import { Injectable, Logger } from '@nestjs/common';
import FormData from 'form-data';
import fetch, { Response } from 'node-fetch';
import { ExternalPdfResponseDto } from './dtos/pdf-response.dto';
import { ConsumptionItemDto } from './dtos/consumption-item.dto';
import { ConfigError, ServiceError, ValidationError } from 'src/core/errors';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PdfService {
  private readonly logger = new Logger(PdfService.name);
  private readonly EXTERNAL_API_URL: string;

  constructor(private readonly configService: ConfigService) {
    const url = this.configService.get<string>('MAGIC_PDF_URL');
    if (!url) {
      throw new ConfigError({
        message: 'MAGIC_PDF_URL deve ser definido no ambiente',
      });
    }
    this.EXTERNAL_API_URL = url;
  }

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
        `Erro de rede ao chamar a API de PDF externa: ${(err as Error).message}`,
      );
      throw new ServiceError({
        message: 'Erro ao acessar o serviço de processamento de faturas.',
      });
    }

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      this.logger.error(
        `A API externa de PDF retornou um status não-OK ${response.status}: ${text}`,
      );

      throw new ServiceError({
        message: 'Falha ao processar o PDF na API externa.',
      });
    }

    const raw = await response.text();
    this.logger.debug(`Resposta bruta de um PDF externo da API: ${raw}`);

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw) as ExternalPdfResponseDto;
    } catch {
      this.logger.error(
        'A API externa de PDF retornou uma resposta diferente de um JSON',
      );
      throw new ValidationError({
        message: 'Resposta da API externa em um formato inesperado.',
      });
    }

    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      !('valor' in parsed) ||
      !('invoice' in parsed)
    ) {
      this.logger.error(
        'Resposta da API externa de PDF sem campos obrigatórios',
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
