import { IsDate, IsNumber, Min } from 'class-validator';

export class CreateConsumoDto {
  @IsNumber()
  @Min(0)
  consumoForaPontaEmKWH: number;

  @IsDate()
  mesDoConsumo: Date;
}
