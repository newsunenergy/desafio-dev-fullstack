import { IsEmail, IsNotEmpty, IsString, ValidateNested, ArrayMinSize, IsEnum, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class ConsumoDto {
  @IsNotEmpty()
  consumoForaPontaEmKWH: number;

  @IsDate()
  mesDoConsumo: Date;
}

export class UnidadeDto {
  @IsString()
  @IsNotEmpty()
  codigoDaUnidadeConsumidora: string;

  @IsEnum(['monofasico', 'bifasico', 'trifasico'])
  modeloFasico: string;

  @IsEnum(['AX', 'B1', 'B2', 'B3'])
  enquadramento: string;

  @ArrayMinSize(12)
  @ValidateNested({ each: true })
  @Type(() => ConsumoDto)
  historicoDeConsumoEmKWH: ConsumoDto[];
}

export class CreateLeadDto {
  @IsString()
  @IsNotEmpty()
  nomeCompleto: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  telefone: string;

  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => UnidadeDto)
  unidades: UnidadeDto[];
}
