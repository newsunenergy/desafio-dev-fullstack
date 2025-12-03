import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { HttpErrorJSON } from './errors';

interface CustomException extends HttpException {
  toJSON(): HttpErrorJSON;
}

function isCustomException(
  exception: HttpException,
): exception is CustomException {
  return (
    typeof (exception as unknown as Record<string, unknown>).toJSON ===
    'function'
  );
}

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<import('express').Response>();
    const status = exception.getStatus();

    const responseData: HttpErrorJSON | Record<string, unknown> | string =
      isCustomException(exception)
        ? exception.toJSON()
        : (exception.getResponse() as Record<string, unknown> | string);

    this.logger.debug(`Exception caught: ${JSON.stringify(responseData)}`);
    response.status(status).json(responseData);
  }
}
