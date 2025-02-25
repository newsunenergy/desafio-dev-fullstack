import { HttpException, HttpStatus } from '@nestjs/common';

export class EnergyBillsDuplicatedException extends HttpException {
  constructor(errorDescription: string) {
    super(
      {
        error_description: errorDescription,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
