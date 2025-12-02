import { HttpException, HttpStatus } from '@nestjs/common';

export class UnitCodeAlreadyExistsException extends HttpException {
  constructor(errorDescription: string) {
    super(
      {
        error_description: errorDescription,
      },
      HttpStatus.CONFLICT,
    );
  }
}
