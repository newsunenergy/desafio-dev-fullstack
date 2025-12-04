import { IsNumber, IsString } from 'class-validator';

export class ConsumptionhistoryDto {
  @IsNumber()
  OffTipInKWH: number;

  @IsString()
  monthOfConsumption: string;
}
