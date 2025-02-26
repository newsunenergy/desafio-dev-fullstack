import { TipoModeloFasico, TipoEnquadramento } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsArray,
  ValidateNested,
} from 'class-validator';

export class HistoricoConsumoDto {
  @IsNotEmpty()
  consumoForaPontaEmKWH: number;

  @IsNotEmpty()
  mesDoConsumo: Date;
}

export class UnidadeDto {
  @IsString()
  @IsNotEmpty()
  codigoDaUnidadeConsumidora: string;

  @IsEnum(TipoModeloFasico)
  modeloFasico: TipoModeloFasico;

  @IsEnum(TipoEnquadramento)
  enquadramento: TipoEnquadramento;

  /*   @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HistoricoConsumoDto)
  historicoDeConsumoEmKWH: HistoricoConsumoDto[]; */
}
