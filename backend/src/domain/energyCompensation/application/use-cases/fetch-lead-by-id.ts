import { Injectable } from '@nestjs/common';
import {
  LeadRepository,
  LeadWithUnitsDTO,
} from '../repositories/lead-repository';
import { Either, right } from '../../../../../src/core/either';

interface FetchLeadByIdUseCaseRequest {
  id: string;
}

type FetchLeadByIdUseCaseResponse = Either<
  null,
  { leadWithUnits: LeadWithUnitsDTO }
>;
@Injectable()
export class FetchLeadByIdUseCase {
  constructor(private leadRepository: LeadRepository) {}

  async execute({
    id,
  }: FetchLeadByIdUseCaseRequest): Promise<FetchLeadByIdUseCaseResponse> {
    const leadWithUnits = await this.leadRepository.findById(id);

    return right({
      leadWithUnits,
    });
  }
}
