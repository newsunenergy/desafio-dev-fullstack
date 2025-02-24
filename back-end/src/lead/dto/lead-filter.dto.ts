import { IsOptional, IsString } from 'class-validator';

export class LeadFilterDto {
  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  consumerUnitCode?: string;
}
