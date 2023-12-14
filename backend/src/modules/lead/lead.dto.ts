import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { InformacaoDaFatura } from './lead.service';
import { Transform } from 'class-transformer';

export class InputCreateLeadDto {
  @IsNotEmpty({
    message: 'O nome não pode ser vazio',
  })
  nomeCompleto: string;

  @IsEmail(undefined, {
    message: 'O e-mail informado é inválido',
  })
  email: string;

  @IsString({
    message: 'O número de telefone informado é inválido',
  })
  @Transform(({ value }) => value.replaceAll(/[^0-9]/g, ''))
  telefone: string;

  @IsArray({
    message: 'As informações da fatura informada são inválidas',
  })
  informacoesDaFatura: InformacaoDaFatura[];
}
