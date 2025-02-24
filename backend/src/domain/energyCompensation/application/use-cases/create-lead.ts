import { Injectable } from '@nestjs/common';
import { Either, left, right } from '../../../../core/either';
import {
  LeadRepository,
  UnitWithConsumptionsDTO,
} from '../repositories/lead-repository';
import axios from 'axios';
import { Lead } from '../../enterprise/entities/lead';
import { Unit } from '../../enterprise/entities/unit';
import { Consumption } from '../../enterprise/entities/consumption';

interface CreateLeadUseCaseRequest {
  name: string;
  email: string;
  phone: string;
  bills: Express.Multer.File[];
}

interface InvoiceInformation {
  consumo_fp: number;
  consumo_date: string;
}

interface BillInformationDTO {
  unit_key: string;
  phaseModel: string;
  chargingModel: string;
  invoice: InvoiceInformation[];
}

type CreateLeadUseCaseResponse = Either<Error, null>;

@Injectable()
export class CreateLeadUseCase {
  constructor(private readonly leadRepository: LeadRepository) {}

  private async getEnergyBillInformation(
    file: Express.Multer.File,
  ): Promise<BillInformationDTO> {
    const formData = new FormData();
    const blob = new Blob([file.buffer]);
    formData.append('file', blob, file.originalname);

    try {
      const response = await axios.post<BillInformationDTO>(
        'https://magic-pdf.solarium.newsun.energy/v1/magic-pdf',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('500');
    }
  }

  private async mapBillInformation(
    bills: Express.Multer.File[],
  ): Promise<UnitWithConsumptionsDTO[]> {
    const billInformationArray = await Promise.all(
      bills.map((bill) => this.getEnergyBillInformation(bill)),
    );

    return billInformationArray.map((billInformation) => {
      return {
        unit: Unit.create({
          consumerUnitCode: billInformation.unit_key,
          phaseModel: billInformation.phaseModel,
          framing: billInformation.chargingModel,
        }),
        consumptions: billInformation.invoice.map(
          ({ consumo_fp, consumo_date }) =>
            Consumption.create({
              offPeakInKWH: Number(consumo_fp),
              consumptionMonth: new Date(consumo_date),
            }),
        ),
      };
    });
  }

  async execute({
    name,
    email,
    phone,
    bills,
  }: CreateLeadUseCaseRequest): Promise<CreateLeadUseCaseResponse> {
    const leadExists = await this.leadRepository.findByEmail(email);

    if (leadExists) {
      return left(new Error('409'));
    }

    const units = await this.mapBillInformation(bills);

    const lead = Lead.create({
      fullName: name,
      email,
      phone,
    });

    await this.leadRepository.create({ lead, units });

    return right(null);
  }
}
