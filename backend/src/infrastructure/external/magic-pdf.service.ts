import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { ConfigService } from '@nestjs/config';
import FormData from 'form-data';

export interface InvoiceItem {
  consumo_fp: number; // consumoForaPontaEmKWH
  consumo_date: string; // mesDoConsumo (ISO date string)
}

export interface MagicPdfResponse {
  unit_key: string; // codigoDaUnidadeConsumidora
  chargingModel: string; // enquadramento (AX, B1, B2, B3)
  phaseModel: string; // modeloFasico (monofasico, bifasico, trifasico)
  invoice: InvoiceItem[]; // array de objetos com consumo_fp e consumo_date
  valor?: number; // valor monetário (opcional)
  barcode?: string; // código de barras (opcional)
}

@Injectable()
export class MagicPdfService {
  private readonly logger = new Logger(MagicPdfService.name);
  private readonly axiosInstance: AxiosInstance;
  private readonly apiUrl: string;

  constructor(private configService: ConfigService) {
    this.apiUrl =
      this.configService.get<string>('MAGIC_PDF_URL') ||
      'https://magic-pdf.solarium.newsun.energy/v1/magic-pdf';

    this.axiosInstance = axios.create({
      timeout: 30000, // 30 segundos
    });
  }

  async decodificarContaEnergia(
    file: Express.Multer.File,
  ): Promise<MagicPdfResponse> {
    try {
      this.logger.log(
        `Iniciando decodificação do arquivo: ${file?.originalname || 'desconhecido'}`,
      );

      if (!file || !file.buffer) {
        this.logger.error('Arquivo inválido ou buffer vazio');
        throw new BadRequestException('Arquivo inválido ou buffer vazio');
      }

      const formData = new FormData();

      // Usar Buffer.from para garantir que seja um Buffer válido
      const fileBuffer = Buffer.isBuffer(file.buffer)
        ? file.buffer
        : Buffer.from(file.buffer);

      // Verificar se o buffer não está vazio
      if (fileBuffer.length === 0) {
        this.logger.error('Buffer do arquivo está vazio');
        throw new BadRequestException('Arquivo está vazio ou corrompido');
      }

      // Verificar se é PDF
      if (file.mimetype && !file.mimetype.includes('pdf')) {
        this.logger.warn(
          `Tipo MIME inesperado: ${file.mimetype}. Esperado: application/pdf`,
        );
      }

      // Adicionar o arquivo ao FormData
      // A API espera o campo "file" conforme documentação
      formData.append('file', fileBuffer, {
        filename: file.originalname || 'conta.pdf',
        contentType: file.mimetype || 'application/pdf',
      });

      this.logger.log(
        `Preparando envio para API externa: ${file.originalname} (${file.size} bytes, buffer: ${fileBuffer.length} bytes, MIME: ${file.mimetype || 'não especificado'})`,
      );

      // Obter headers do FormData
      const formHeaders = formData.getHeaders();
      this.logger.debug(`Headers do FormData: ${JSON.stringify(formHeaders)}`);
      this.logger.debug(`URL da API: ${this.apiUrl}`);

      this.logger.log('Enviando requisição para API externa...');
      const response = await this.axiosInstance.post<MagicPdfResponse>(
        this.apiUrl,
        formData,
        {
          headers: {
            ...formHeaders,
          },
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        },
      );

      this.logger.log(
        `Resposta recebida da API externa. Status: ${response.status}`,
      );

      if (!response.data) {
        this.logger.error('Resposta vazia da API de decodificação');
        throw new BadRequestException(
          'A API de decodificação retornou uma resposta vazia',
        );
      }

      // Validar estrutura da resposta
      if (!response.data.unit_key) {
        this.logger.error(
          `Resposta da API não contém unit_key. Dados recebidos: ${JSON.stringify(response.data)}`,
        );
        throw new BadRequestException(
          'A API de decodificação retornou dados incompletos (faltando unit_key)',
        );
      }

      if (!response.data.invoice || !Array.isArray(response.data.invoice)) {
        this.logger.error(
          `Resposta da API não contém invoice válido. Dados recebidos: ${JSON.stringify(response.data)}`,
        );
        throw new BadRequestException(
          'A API de decodificação retornou dados incompletos (faltando invoice)',
        );
      }

      this.logger.log(
        `Conta de energia decodificada com sucesso: unit_key=${response.data.unit_key}, invoice.length=${response.data.invoice.length}`,
      );
      return response.data;
    } catch (error) {
      this.logger.error('Erro ao decodificar conta de energia', error);
      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.status;
        const responseData = error.response?.data as
          | string
          | { message?: string; error?: string; detail?: string }
          | undefined;

        // Log detalhado da resposta da API
        this.logger.error(
          `Resposta da API Magic PDF - Status: ${statusCode}, Data: ${JSON.stringify(responseData)}`,
        );

        // Tentar extrair a mensagem de erro de diferentes formatos possíveis
        let errorMessage = error.message;
        if (responseData) {
          if (typeof responseData === 'string') {
            errorMessage = responseData;
          } else if (
            typeof responseData === 'object' &&
            responseData !== null
          ) {
            errorMessage =
              responseData.message ||
              responseData.error ||
              responseData.detail ||
              JSON.stringify(responseData);
          }
        }

        this.logger.error(`Mensagem de erro extraída: ${errorMessage}`);

        // Mensagens mais amigáveis para erros comuns
        if (statusCode === 400) {
          const errorMessageLower = errorMessage.toLowerCase();
          if (
            errorMessageLower.includes('chargingmodel') ||
            errorMessageLower.includes('não foi possível identificar') ||
            errorMessageLower.includes('nao foi possivel identificar') ||
            errorMessageLower.includes('not found') ||
            errorMessageLower.includes('invalid format')
          ) {
            throw new BadRequestException(
              `Não foi possível decodificar a conta de energia: ${errorMessage}. Verifique se o arquivo é uma conta de energia válida em formato PDF e se contém todas as informações necessárias (código da unidade, modelo de cobrança, histórico de consumo).`,
            );
          }
          throw new BadRequestException(
            `Erro ao processar a conta de energia: ${errorMessage}`,
          );
        }

        if (statusCode === 413) {
          throw new BadRequestException(
            'Arquivo muito grande. Tente com um arquivo menor.',
          );
        }

        throw new BadRequestException(
          `Erro ao decodificar conta de energia (${statusCode}): ${errorMessage}`,
        );
      }
      throw error;
    }
  }
}
