import { IsArray, IsEmail, IsNotEmpty, IsPhoneNumber, IsString, ArrayMinSize, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IsModeloFasico, IsEnquadramento, IsHistorico12Meses } from './custom-validators';

class HistoricoDto {
  @IsNotEmpty()
  consumoForaPontaEmKWH: number;

  @IsNotEmpty()
  mesDoConsumo: Date;
}

class UnidadeDto {
  @IsString() @IsNotEmpty()
  codigoDaUnidadeConsumidora: string;

  @IsString() @IsNotEmpty() @IsModeloFasico()
  modeloFasico: 'monofasico' | 'bifasico' | 'trifasico';

  @IsString() @IsNotEmpty() @IsEnquadramento()
  enquadramento: 'AX' | 'B1' | 'B2' | 'B3';

  @IsArray()
  @IsHistorico12Meses()
  @ValidateNested({ each: true })
  @Type(() => HistoricoDto)
  historicoDeConsumoEmKWH: HistoricoDto[];
}

export class CreateLeadDto {
  @IsString() @IsNotEmpty()
  nomeCompleto: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('BR')
  telefone: string;

  
  @IsArray()
  @ArrayMinSize(1, { message: 'Envie pelo menos uma fatura' })
  @ValidateNested({ each: true })
  @Type(() => UnidadeDto)
  faturas: UnidadeDto[];
}