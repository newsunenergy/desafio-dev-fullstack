/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class ValidateClientDto {
  @ApiProperty({
    example: 'Matheus Affonso',
    description: 'Nome completo do cliente',
  })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({
    example: 'matheus.loubach@gmail.com',
    description: 'E-mail do cliente',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '21911111111',
    description: 'Telefone do cliente (apenas números)',
  })
  @IsString()
  @IsNotEmpty()
  telefone: string;
}
