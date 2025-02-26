import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import axios from 'axios';
import { ClientsService } from './clients.service';
import * as FormData from 'form-data';
import { Multer } from 'multer';
import { IClient, IDataPdf, ILeadFilters } from './clients.interface';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('clients')
export class ClientsController {
  constructor(private readonly leadsService: ClientsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async createClient(
    @UploadedFiles() file: Multer.File[],
    @Body() body: IClient,
  ) {
    if (!file || file.length === 0) {
      throw new Error('Arquivo não foi enviado');
    }

    const { nome, email, telefone } = body;

    const pdfs = file.map(async (file) => {
      const formData: FormData = new FormData();
      formData.append('file', file.buffer, {
        filename: file.originalname as string,
      });

      const res = await axios.post<IDataPdf>(
        'https://magic-pdf.solarium.newsun.energy/v1/magic-pdf',
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
        },
      );

      return res.data;
    });

    const dataPdf = await Promise.all(pdfs);

    const unidades = dataPdf.map((data) => ({
      codigoDaUnidadeConsumidora: data.unit_key,
      modeloFasico: data.phaseModel,
      enquadramento: data.chargingModel,
      historicoDeConsumoEmKWH: data.invoice.map((c) => ({
        consumoForaPontaEmKWH: c.consumo_fp,
        mesDoConsumo: new Date(c.consumo_date),
      })),
    }));

    const Data: IClient = {
      nome,
      email,
      telefone,
      unidades,
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
