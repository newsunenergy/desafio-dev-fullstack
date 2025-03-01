import { IsOptional, IsString } from 'class-validator';

export class FindAllQueryDto {
  @IsOptional()
  @IsString()
  search: string;
}
