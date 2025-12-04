import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { Moth } from 'src/utils/utils';
import axios from 'axios';

interface DecodedData {
  unit_key: string;
  phaseModel: string;
  chargingModel: string;
  invoice: Invoice[];
}

interface Invoice {
  consumo_fp: number;
  consumo_date: string;
}

const MAGIC_PDF_API_URL =
  'https://magic-pdf.solarium.newsun.energy/v1/magic-pdf';

@Injectable()
export class LeadsService {
  constructor(private prisma: PrismaService) {}

  private async decodeEnergyBill(
    file: Express.Multer.File,
  ): Promise<DecodedData> {
    const formData = new FormData();
    const blob = new Blob([file.buffer]);
    formData.append('file', blob, file.originalname);

    try {
      const response = await axios.post<DecodedData>(
        MAGIC_PDF_API_URL,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao decodificar a conta de energia:', error);
      throw new Error('Falha ao decodificar a conta de energia');
    }
  }

  private mapDecodedDataToUnits(decodedData: DecodedData) {
    return [
      {
        ConsumerUnitCode: decodedData.unit_key,
        modelPhasic: decodedData.phaseModel,
        framing: decodedData.chargingModel,
        consumptionhistory: {
          create: decodedData.invoice.map(({ consumo_fp, consumo_date }) => ({
            OffTipInKWH: Number(consumo_fp),
            monthOfConsumption: new Date(consumo_date),
          })),
        },
      },
    ];
  }

  async createLead(
    { name, email, phone }: CreateLeadDto,
    file: Express.Multer.File,
  ) {
    const decodedData = await this.decodeEnergyBill(file);
    console.log('Dados decodificados:', decodedData);

    const units = this.mapDecodedDataToUnits(decodedData);

    try {
      const lead = await this.prisma.lead.create({
        data: {
          name,
          email,
          phone,
          units: {
            create: units,
          },
        },
      });

      return lead;
    } catch (error) {
      console.error('Erro ao criar lead:', error);
      throw new Error('Falha ao criar lead');
    }
  }

  async getLeads(filters: {
    name?: string;
    email?: string;
    ConsumerUnitCode?: string;
  }) {
    const { name, email, ConsumerUnitCode } = filters;

    const response = await this.prisma.lead.findMany({
      where: {
        name: name ? { contains: name } : undefined,
        email: email ? { contains: email } : undefined,
        units: ConsumerUnitCode
          ? {
              some: {
                ConsumerUnitCode: {
                  contains: ConsumerUnitCode,
                },
              },
            }
          : undefined,
      },
      include: {
        units: {
          include: {
            consumptionhistory: Moth('monthOfConsumption'),
          },
        },
      },
    });

    return response;
  }

  async getLeadById(id: string) {
    const lead = await this.prisma.lead.findUnique({
      where: { id },
      include: {
        units: {
          include: {
            consumptionhistory: Moth('monthOfConsumption'),
          },
        },
      },
    });

    if (!lead) {
      throw new NotFoundException(`Lead com ID ${id} não encontrado`);
    }

    return lead;
  }

  async deleteLeadById(id: string) {
    try {
      const lead = await this.prisma.lead.delete({
        where: { id },
      });
      return lead;
    } catch (error) {
      console.error('Erro ao deletar lead:', error);
      throw new NotFoundException(`Lead com ID ${id} não encontrado`);
    }
  }
}
