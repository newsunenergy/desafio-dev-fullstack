import { HttpException, HttpStatus } from '@nestjs/common';

export class LeadNotFoundException extends HttpException {
  constructor(errorDescription: string) {
    super(
      {
        error_description: errorDescription,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
