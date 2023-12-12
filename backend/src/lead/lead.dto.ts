import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class CreateLeadDto {
  @IsString()
  nomeCompleto: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  telefone: string;
}
