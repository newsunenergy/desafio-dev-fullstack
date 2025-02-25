import { Injectable } from '@nestjs/common';
import {
  LeadRepository,
  LeadWithUnitsDTO,
} from '../repositories/lead-repository';
import { Either, left, right } from '../../../../../src/core/either';

interface FetchLeadByIdUseCaseRequest {
  id: string;
}

type FetchLeadByIdUseCaseResponse = Either<
  Error,
  { leadWithUnits: LeadWithUnitsDTO }
>;
@Injectable()
export class FetchLeadByIdUseCase {
  constructor(private leadRepository: LeadRepository) {}

  async execute({
    id,
  }: FetchLeadByIdUseCaseRequest): Promise<FetchLeadByIdUseCaseResponse> {
    const leadWithUnits = await this.leadRepository.findById(id);

    if (!leadWithUnits) {
      return left(new Error('404'));
    }

    return right({
      leadWithUnits,
    });
  }
}
