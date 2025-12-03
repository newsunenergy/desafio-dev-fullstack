import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { ValidationError } from './errors';

@Catch(BadRequestException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<import('express').Response>();

    const exceptionResponse = exception.getResponse();

    let message: string | string[];

    if (
      typeof exceptionResponse === 'object' &&
      exceptionResponse !== null &&
      'message' in exceptionResponse
    ) {
      const extracted = (exceptionResponse as { message: unknown }).message;

      if (Array.isArray(extracted)) {
        message = extracted.filter((m): m is string => typeof m === 'string');
      } else if (typeof extracted === 'string') {
        message = extracted;
      } else {
        message = 'Erro de validação desconhecido.';
      }
    } else if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    } else {
      message = 'Erro de validação desconhecido.';
    }

    const messageText = Array.isArray(message) ? message.join(', ') : message;

    response.status(400).json(
      new ValidationError({
        message: messageText,
      }).toJSON(),
    );
  }
}
