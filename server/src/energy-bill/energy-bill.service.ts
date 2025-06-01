import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as FormData from 'form-data';
import { catchError, firstValueFrom } from 'rxjs';
import { CreateUnidadeDto } from 'src/unidade/dto/create-unidade.dto';
import { Unidade } from 'src/unidade/entities/unidade.entity';
import { Repository } from 'typeorm';
import { EnergyBill } from './types/energy-bill.type';

@Injectable()
export class EnergyBillService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Unidade)
    private readonly unidadeRepository: Repository<Unidade>,
  ) {}
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
            throw new HttpException(
              'Falha ao enviar conta para API externa',
              HttpStatus.BAD_REQUEST,
            );
          }),
        ),
    );
    const unitCodeExists = await this.unidadeRepository.findOneBy({
      codigoDaUnidadeConsumidora: data.unit_key,
    });
    if (unitCodeExists !== null) {
      throw new HttpException(
        'Unidade consumidora já cadastrada no sistema',
        HttpStatus.BAD_REQUEST,
      );
    }

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
