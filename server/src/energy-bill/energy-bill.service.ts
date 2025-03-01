import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as FormData from 'form-data';
import { catchError, firstValueFrom } from 'rxjs';
import { CreateUnidadeDto } from 'src/unidade/dto/create-unidade.dto';
import { EnergyBill } from './types/energy-bill.type';

@Injectable()
export class EnergyBillService {
  constructor(private readonly httpService: HttpService) {}
  private readonly baseUrl = process.env.API_URL;

  async decode(file: Express.Multer.File): Promise<CreateUnidadeDto> {
    const formData = new FormData();
    formData.append('file', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    const { data } = await firstValueFrom(
      this.httpService
        .post<EnergyBill>(`${this.baseUrl}/magic-pdf`, formData, {
          headers: formData.getHeaders(),
        })
        .pipe(
          catchError((error) => {
            console.error('Erro ao enviar conta para API externa:', error);
            throw new Error('Falha ao enviar conta para API externa');
          }),
        ),
    );

    return {
      codigoDaUnidadeConsumidora: data.unit_key,
      modeloFasico: data.phaseModel,
      enquadramento: data.chargingModel,
      consumoEmReais: data.valor,
      historicoDeConsumoEmKWH: data.invoice.map(
        ({ consumo_date, consumo_fp }) => ({
          consumoForaPontaEmKWH: consumo_fp,
          mesDoConsumo: consumo_date,
        }),
      ),
    };
  }
}
