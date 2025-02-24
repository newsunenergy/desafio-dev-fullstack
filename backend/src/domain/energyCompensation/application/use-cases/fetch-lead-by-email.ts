import { Injectable } from '@nestjs/common';
import {
  LeadRepository,
  LeadWithUnitsDTO,
} from '../repositories/lead-repository';
import { Either, right } from '../../../../../src/core/either';

interface FetchLeadByEmailUseCaseRequest {
  email: string;
}

type FetchLeadByEmailUseCaseResponse = Either<
  null,
  { leadWithUnits: LeadWithUnitsDTO }
>;
@Injectable()
export class FetchLeadByEmailUseCase {
  constructor(private leadRepository: LeadRepository) {}

  async execute({
    email,
  }: FetchLeadByEmailUseCaseRequest): Promise<FetchLeadByEmailUseCaseResponse> {
    const leadWithUnits = await this.leadRepository.findByEmail(email);

    return right({
      leadWithUnits,
    });
  }
}
