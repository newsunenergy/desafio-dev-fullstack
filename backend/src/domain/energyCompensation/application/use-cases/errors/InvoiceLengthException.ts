import { HttpException, HttpStatus } from '@nestjs/common';

export class InvoiceLengthException extends HttpException {
  constructor(errorDescription: string) {
    super(
      {
        error_description: errorDescription,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
