/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import axios from 'axios';
import { ClientsService } from './clients.service';
import * as FormData from 'form-data';
import { Multer } from 'multer';
import { IClient, IDataPdf, ILeadFilters } from './clients.interface';

@Controller('clients')
export class ClientsController {
  constructor(private readonly leadsService: ClientsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createClient(@UploadedFile() file: Multer.File, @Body() body: IClient) {
    if (!file) {
      throw new Error('Arquivo não foi enviado');
    }

    const { nome, email, telefone } = body;

    const formData: FormData = new FormData();
    formData.append('file', file.buffer, { filename: file.originalname });

    const res = await axios.post<IDataPdf>(
      'https://magic-pdf.solarium.newsun.energy/v1/magic-pdf',
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
      },
    );

    const dataPdf: IDataPdf = res.data;

    const Data = {
      nome: nome,
      email: email,
      telefone: telefone,
      unidades: [
        {
          codigoDaUnidadeConsumidora: dataPdf.unit_key,
          modeloFasico: dataPdf.phaseModel,
          enquadramento: dataPdf.chargingModel,
          historicoDeConsumoEmKWH: dataPdf.invoice.map((c) => ({
            consumoForaPontaEmKWH: c.consumo_fp,
            mesDoConsumo: new Date(c.consumo_date),
          })),
        },
      ],
    };

    return this.leadsService.createLead(Data);
  }

  @Get('all')
  async getAllClients(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query() filters: ILeadFilters,
  ) {
    return this.leadsService.getAllClients({
      page: Number(page),
      limit: Number(limit),
      filters: filters,
    });
  }

  @Get(':id')
  async getClientsById(@Param('id') id: string) {
    return this.leadsService.getLeadById(id);
  }
}
