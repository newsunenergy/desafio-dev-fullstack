import { IsDate, IsNumber, IsString } from 'class-validator';

export class ConsumoDto {
  @IsNumber()
  consumoForaPontaEmKWH: number;

  @IsDate()
  mesDoConsumo: Date;

  @IsString()
  unidadeId: string;
}
