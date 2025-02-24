import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './entities/lead.entity';
import { Unit } from './entities/unit.entity';
import { Consumption } from './entities/consumption.entity';
import { CreateLeadDto } from './dto/create-lead.dto';
import axios from 'axios';
import { LeadFilterDto } from './dto/lead-filter.dto';

@Injectable()
export class LeadService {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,
  ) { }

  async createLead(
    data: CreateLeadDto,
    files: Express.Multer.File[],
  ): Promise<Lead> {
    if (!files || files.length === 0) {
      throw new BadRequestException('Pelo menos um arquivo deve ser enviado.');
    }

    const unitsDecoded: Unit[] = [];

    const seenUnitCodes: Set<string> = new Set();

    for (const file of files) {
      const fileBlob = new Blob([file.buffer], { type: file.mimetype });

      const formData = new FormData();
      formData.append('file', fileBlob, file.originalname);

      try {
        const response = await axios.post(
          'https://magic-pdf.solarium.newsun.energy/v1/magic-pdf',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        const decodedData = response.data;

        const invoiceData = decodedData.invoice;

        if (Array.isArray(invoiceData)) {
          for (const unitData of invoiceData) {
            const unit = new Unit();
            unit.consumerUnitCode = decodedData.unit_key;
            unit.phaseModel = decodedData.phaseModel as 'monophase' | 'biphase' | 'triphasic';
            unit.chargingModel = decodedData.chargingModel as 'AX' | 'B1' | 'B2' | 'B3';

            if (seenUnitCodes.has(unit.consumerUnitCode)) {
              continue;
            }

            seenUnitCodes.add(unit.consumerUnitCode);

            const consumptionRecords: Consumption[] = invoiceData.map((item) => {
              const consumption = new Consumption();
              consumption.offPeakConsumptionInKWh = item.consumo_fp;
              consumption.consumptionMonth = new Date(item.consumo_date);
              return consumption;
            });

            if (consumptionRecords.length !== 12) {
              throw new Error('A unidade deve ter exatamente 12 meses de consumo.');
            }

            unit.consumptionHistory = consumptionRecords;
            unitsDecoded.push(unit);
          }
        } else {
          throw new Error('Erro: invoiceData não é um array');
        }
      } catch (error) {
        throw new Error('Erro ao decodificar o arquivo');
      }
    }

    if (unitsDecoded.length < 1) {
      throw new BadRequestException('O lead deve ter no mínimo uma unidade.');
    }

    const existingLead = await this.leadRepository.findOne({
      where: { email: data.email },
    });

    if (existingLead) {
      throw new BadRequestException('O email já está em uso.');
    }

    const lead = new Lead();
    lead.fullName = data.fullName;
    lead.email = data.email;
    lead.phoneNumber = data.phoneNumber;
    lead.units = unitsDecoded;

    const savedLead = await this.leadRepository.save(lead);

    return savedLead;
  }

  async findAll(filter: LeadFilterDto): Promise<Lead[]> {
    const queryBuilder = this.leadRepository.createQueryBuilder('lead');

    if (filter.fullName) {
      queryBuilder.andWhere('lead.fullName LIKE :fullName', { fullName: `%${filter.fullName}%` });
    }

    if (filter.email) {
      queryBuilder.andWhere('lead.email LIKE :email', { email: `%${filter.email}%` });
    }

    if (filter.consumerUnitCode) {
      queryBuilder.andWhere('lead.units.consumerUnitCode LIKE :consumerUnitCode', { consumerUnitCode: `%${filter.consumerUnitCode}%` });
    }

    return await queryBuilder
      .leftJoinAndSelect('lead.units', 'unit')
      .leftJoinAndSelect('unit.consumptionHistory', 'consumption')
      .getMany();
  }

  async findById(id: string): Promise<Lead> {
    const lead = await this.leadRepository.findOne({
      where: { id },
      relations: ['units', 'units.consumptionHistory'],
    });

    if (!lead) {
      throw new NotFoundException(`Lead com ID ${id} não encontrado.`);
    }

    return lead;
  }
}
