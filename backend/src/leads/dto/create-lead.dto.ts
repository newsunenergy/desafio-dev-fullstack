import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class FaturaDto {
  @IsNotEmpty()
  file: any;
}

export class CreateLeadDto {
  @IsString()
  @IsNotEmpty()
  nomeCompleto: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('BR')
  telefone: string;

  @ValidateNested({ each: true })
  @Type(() => FaturaDto)
  faturas: FaturaDto[];
}