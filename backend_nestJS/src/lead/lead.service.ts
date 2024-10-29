import { Injectable } from "@nestjs/common";
import { CreateLeadDto, CreateUnitDto } from "./dto/create-lead.dto";
import { PrismaService } from "src/database/prisma.service";
import { HttpService } from "@nestjs/axios";
import FormData from "form-data";
import { catchError, firstValueFrom } from "rxjs";
import { AxiosError } from "axios";
import { LeadPDF } from "./leadModel";

@Injectable()
export class LeadService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService
  ) {}

  createLead(data: CreateLeadDto) {
    return this.prisma.lead.create({
      data: {
        nomeCompleto: data.nomeCompleto,
        email: data.email,
        telefone: data.telefone,
      },
    });
  }

  createUnit(unitData: CreateUnitDto) {
    return this.prisma.unit.create({
      data: {
        consumoEmReais: unitData.consumoEmReais,
        codigoDaUnidadeConsumidora: unitData.codigoDaUnidadeConsumidora,
        modeloFasico: unitData.modeloFasico,
        enquadramento: unitData.enquadramento,
        historicoDeConsumoEmKWH: {
          createMany: {
            data: unitData.unidades.map((unidade) => ({
              consumoForaPontaEmKWH: unidade.consumoForaPontaEmKWH,
              mesDoConsumo: unidade.mesDoConsumo,
            })),
          },
        },
        Lead: {
          connect: {
            id: unitData.leadID,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.lead.findMany();
  }

  findOne(id: string) {
    return this.prisma.lead.findUnique({
      where: {
        id,
      },
    });
  }

  leadPDFtoCreateUnityDTO(leadPDF: LeadPDF, leadId: string) {
    return {
      leadID: leadId,
      consumoEmReais: leadPDF.valor,
      codigoDaUnidadeConsumidora: leadPDF.unit_key,
      modeloFasico: leadPDF.phaseModel,
      enquadramento: leadPDF.chargingModel,
      unidades: leadPDF.invoice.map((invoice) => ({
        consumoForaPontaEmKWH: invoice.consumo_fp,
        mesDoConsumo: invoice.consumo_date,
      })),
    };
  }

  async decodeBillPDF(file: Express.Multer.File) {
    const formData = new FormData();
    const blob = new Blob([file.buffer], { type: file.mimetype });
    formData.append("file", blob, file.originalname);
    const headers = {
      ...formData.getHeaders(),
      "Content-Length": formData.getLengthSync(),
    };
    const { data } = await firstValueFrom(
      this.httpService
        .post<LeadPDF>("https://magic-pdf.solarium.newsun.energy/v1/magic-pdf", formData, {
          headers,
        })
        .pipe(
          catchError((error: AxiosError) => {
            throw error;
          })
        )
    );
    return data;
  }
}
