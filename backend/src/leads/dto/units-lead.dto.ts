import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ConsumptionhistoryDto } from './history-lead.dto';

export class UnitDto {
  @IsString()
  ConsumerUnitCode: string;

  @IsString()
  modelPhasic: string;

  @IsString()
  framing: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConsumptionhistoryDto)
  consumptionhistory: ConsumptionhistoryDto[];
}
