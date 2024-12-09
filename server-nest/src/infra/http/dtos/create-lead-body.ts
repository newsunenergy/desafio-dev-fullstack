import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateLeadBody {
  @IsNotEmpty()
  nomeCompleto: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  telefone: string;
}
