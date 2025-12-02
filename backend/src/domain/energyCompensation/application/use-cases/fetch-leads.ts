import { Injectable } from '@nestjs/common';
import {
  LeadRepository,
  LeadWithUnitsDTO,
} from '../repositories/lead-repository';
import { Either, right } from '../../../../../src/core/either';

interface FetchLeadsUseCaseRequest {
  name?: string;
  email?: string;
  phone?: string;
  consumerUnitCode?: string;
}

type FetchLeadsUseCaseResponse = Either<
  null,
  { leadWithUnits: LeadWithUnitsDTO[] }
>;
@Injectable()
export class FetchLeadsUseCase {
  constructor(private leadRepository: LeadRepository) {}

  async execute({
    name,
    email,
    phone,
    consumerUnitCode,
  }: FetchLeadsUseCaseRequest): Promise<FetchLeadsUseCaseResponse> {
    const leadsWithUnits = await this.leadRepository.findAll({
      name,
      email,
      phone,
      consumerUnitCode,
    });

    return right({
      leadWithUnits: leadsWithUnits || [],
    });
  }
}
