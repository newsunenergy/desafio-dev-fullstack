import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateSimulacaoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  telefone: string;
}
