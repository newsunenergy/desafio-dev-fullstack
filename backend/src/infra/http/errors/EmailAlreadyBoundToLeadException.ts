import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailAlreadyTakenBoundToLeadException extends HttpException {
  constructor(errorDescription: string) {
    super(
      {
        error_description: errorDescription,
      },
      HttpStatus.CONFLICT,
    );
  }
}
