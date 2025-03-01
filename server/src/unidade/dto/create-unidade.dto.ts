import { Transform } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { CreateConsumoDto } from 'src/consumo/dto/create-consumo.dto';
import { Enquadramento } from '../entities/enum/enquadramento.enum';
import { ModeloFasico } from '../entities/enum/modelo-fasico.enum';

export class CreateUnidadeDto {
  @IsString()
  @MinLength(2, {
    message: 'Código da unidade consumidora deve ter pelo menos 2 caracteres.',
  })
  codigoDaUnidadeConsumidora: string;

  @IsString()
  @IsEnum(ModeloFasico)
  modeloFasico: ModeloFasico;

  @IsString()
  @IsEnum(Enquadramento)
  enquadramento: Enquadramento;

  @IsNumber()
  @Min(0)
  @Transform(({ value }) => Math.round(value * 100))
  consumoEmReais: number;

  @IsArray()
  @MinLength(12)
  historicoDeConsumoEmKWH: CreateConsumoDto[];
}
