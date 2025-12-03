import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Lead } from './entities/lead.entity';
import { CreateLeadDto } from './dto/create-lead.dto';
import { LeadDto } from './dto/lead.dto';

@Injectable()
export class LeadsService {
  constructor(
    @Inject('LEAD_REPOSITORY')
    private readonly repo: Repository<Lead>,
  ) {}

  async create(
    createDto: CreateLeadDto & {
      amount?: number;
      barcode?: string;
      chargingModel?: string;
      phaseModel?: string;
      unitKey?: string;
      energyCompanyId?: string;
    },
  ): Promise<LeadDto> {
    const entity = this.repo.create({
      name: createDto.name,
      email: createDto.email,
      phone: createDto.phone,
      amount: createDto.amount,
      barcode: createDto.barcode,
      chargingModel: createDto.chargingModel,
      phaseModel: createDto.phaseModel,
      unitKey: createDto.unitKey,
      energyCompanyId: createDto.energyCompanyId,
    });

    const saved = await this.repo.save(entity);

    const dto: LeadDto = {
      id: saved.id,
      name: saved.name,
      email: saved.email,
      phone: saved.phone,
      amount: saved.amount ? Number(saved.amount) : undefined,
      barcode: saved.barcode,
      chargingModel: saved.chargingModel,
      phaseModel: saved.phaseModel,
      unitKey: saved.unitKey,
      energyCompanyId: saved.energyCompanyId,
      createdAt: saved.createdAt,
      updatedAt: saved.updatedAt,
    };

    return dto;
  }
}
