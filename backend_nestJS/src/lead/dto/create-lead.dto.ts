import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  ValidateNested,
} from "class-validator";
import { Consumo } from "../leadModel";

export class CreateLeadDto {
  @IsNotEmpty()
  nomeCompleto: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  telefone: string;
}

export class CreateUnitDto {
  @IsNotEmpty()
  leadID: string;

  @IsNotEmpty()
  codigoDaUnidadeConsumidora: string;

  consumoEmReais: number;

  @IsNotEmpty()
  modeloFasico: string;

  @IsNotEmpty()
  enquadramento: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(12)
  @ArrayMaxSize(12)
  unidades: Consumo[];
}
