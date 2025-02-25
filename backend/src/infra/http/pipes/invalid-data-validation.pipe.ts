import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';

export class InvalidDataValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          error_description:
            'Os dados fornecidos para a requisição são inválidos',
        });
      }

      throw new BadRequestException({
        error_description: 'A validação falhou devido a um erro desconhecido',
      });
    }
  }
}
