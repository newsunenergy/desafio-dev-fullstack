import { TipoModeloFasico, TipoEnquadramento } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsEnum, IsNumber } from 'class-validator';

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

  @IsNumber()
  valor: number;

  @IsEnum(TipoModeloFasico)
  modeloFasico: TipoModeloFasico;

  @IsEnum(TipoEnquadramento)
  enquadramento: TipoEnquadramento;
}
