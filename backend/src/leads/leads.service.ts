import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Lead } from './entities/lead.entity';
import { Unit, ConsumptionHistory } from './entities/unit.entity';
import { CreateLeadDto } from './dto/create-lead.dto';
import { LeadResponseDto } from './dto/lead-response.dto';
import { CreateLeadResponseDto } from './dto/create-lead-response.dto';
import { UnitDto } from './dto/unit.dto';
import { ValidationError, NotFoundError } from 'src/core/errors';

@Injectable()
export class LeadsService {
  constructor(
    @Inject('LEAD_REPOSITORY')
    private readonly leadRepo: Repository<Lead>,
    @Inject('UNIT_REPOSITORY')
    private readonly unitRepo: Repository<Unit>,
  ) {}

  private mapUnitToDto(unit: Unit): UnitDto {
    return {
      id: unit.id,
      codigoDaUnidadeConsumidora: unit.codigoDaUnidadeConsumidora,
      historicoDeConsumoEmKWH: unit.historicoDeConsumoEmKWH,
      amount: Number(unit.amount),
      barcode: unit.barcode,
      chargingModel: unit.chargingModel,
      phaseModel: unit.phaseModel,
      energyCompanyId: unit.energyCompanyId,
      createdAt: unit.createdAt,
      updatedAt: unit.updatedAt,
    };
  }

  private mapLeadToDto(lead: Lead): LeadResponseDto {
    return {
      id: lead.id,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      units: lead.units.map((unit) => this.mapUnitToDto(unit)),
      createdAt: lead.createdAt,
      updatedAt: lead.updatedAt,
    };
  }

  async create(
    createDto: CreateLeadDto & {
      amount: number;
      barcode: string;
      chargingModel: string;
      phaseModel: string;
      unitKey: string;
      energyCompanyId: string;
      invoice: ConsumptionHistory[];
    },
  ): Promise<CreateLeadResponseDto> {
    const last12Invoices = createDto.invoice.slice(-12);

    if (last12Invoices.length === 0) {
      throw new ValidationError({
        message: 'Não há histórico de consumo para a unidade informada.',
      });
    }

    const existingUnit = await this.unitRepo.findOne({
      where: { codigoDaUnidadeConsumidora: createDto.unitKey },
    });

    if (existingUnit) {
      throw new ValidationError({
        message: 'Código da unidade consumidora já existe no sistema.',
      });
    }

    const lead = this.leadRepo.create({
      name: createDto.name,
      email: createDto.email,
      phone: createDto.phone,
    });

    const savedLead = await this.leadRepo.save(lead);

    const unit = this.unitRepo.create({
      codigoDaUnidadeConsumidora: createDto.unitKey,
      historicoDeConsumoEmKWH: last12Invoices,
      amount: createDto.amount,
      barcode: createDto.barcode,
      chargingModel: createDto.chargingModel,
      phaseModel: createDto.phaseModel,
      energyCompanyId: createDto.energyCompanyId,
      leadId: savedLead.id,
      lead: savedLead,
    });

    const savedUnit = await this.unitRepo.save(unit);

    return {
      lead: {
        id: savedLead.id,
        name: savedLead.name,
        email: savedLead.email,
        phone: savedLead.phone,
        createdAt: savedLead.createdAt,
        updatedAt: savedLead.updatedAt,
      },
      unit: this.mapUnitToDto(savedUnit),
    };
  }

  async findAll(filters?: {
    name?: string;
    email?: string;
    codigoDaUnidadeConsumidora?: string;
  }): Promise<LeadResponseDto[]> {
    const query = this.leadRepo
      .createQueryBuilder('lead')
      .leftJoinAndSelect('lead.units', 'unit');

    if (filters?.name) {
      query.andWhere('lead.name LIKE :name', { name: `%${filters.name}%` });
    }

    if (filters?.email) {
      query.andWhere('lead.email LIKE :email', { email: `%${filters.email}%` });
    }

    if (filters?.codigoDaUnidadeConsumidora) {
      query.andWhere('unit.codigoDaUnidadeConsumidora = :codigoUnit', {
        codigoUnit: filters.codigoDaUnidadeConsumidora,
      });
    }

    const leads = await query.getMany();

    return leads.map((lead) => this.mapLeadToDto(lead));
  }

  async findById(id: string): Promise<LeadResponseDto> {
    const lead = await this.leadRepo.findOne({
      where: { id },
      relations: ['units'],
    });

    if (!lead) {
      throw new NotFoundError({
        message: 'Lead não encontrado.',
      });
    }

    return this.mapLeadToDto(lead);
  }
}
