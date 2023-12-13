import { IsEmail, IsNotEmpty, IsObject, IsPhoneNumber } from 'class-validator';

export class InputCreateLeadDto {
  @IsNotEmpty({
    message: 'O nome não pode ser vazio',
  })
  nomeCompleto: string;

  @IsEmail(undefined, {
    message: 'O e-mail informado é inválido',
  })
  email: string;

  @IsPhoneNumber('BR', {
    message: 'O número de telefone informado é inválido',
  })
  telefone: string;
}
