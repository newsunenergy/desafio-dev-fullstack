/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
  ParseIntPipe,
} from '@nestjs/common';
import axios from 'axios';
import { ClientsService } from './clients.service';
import FormData from 'form-data';
import { Multer } from 'multer';
import { IClient, IDataPdf, ILeadFilters } from './clients.interface';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiParam,
  ApiOperation,
} from '@nestjs/swagger';
import { ValidateClientDto } from './dto/client.validate';

@ApiTags('clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly leadsService: ClientsService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 12, {
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.includes('pdf')) {
          return cb(
            new BadRequestException('Apenas arquivos PDF são permitidos'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Criar um cliente enviando arquivos PDF' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nome: { type: 'string', example: 'Matheus Affonso' },
        email: { type: 'string', example: 'matheus.loubach@gmail.com' },
        telefone: { type: 'string', example: '21911111111' },
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
          description: 'Arquivos PDF do cliente',
        },
      },
    },
  })
  async createClient(
    @UploadedFiles() files: Multer.File[],
    @Body() body: ValidateClientDto,
  ) {
    if (!files || files.length === 0) {
      throw new Error('Arquivo não foi enviado');
    }

    const { nome, email, telefone } = body;

    const pdfs = files.map(async (file) => {
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

  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    example: 1,
    description: 'Número da página',
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    example: 10,
    description: 'Quantidade de itens por página',
  })
  @ApiQuery({
    name: 'search',
    type: String,
    required: false,
    example: '',
    description: 'Busca por nome, email ou codigo Da Unidade Consumidora',
  })
  @ApiQuery({
    name: 'filter',
    type: String,
    required: false,
    example: '',
    description: 'Filtrar por Modelo Fásico',
  })
  @ApiTags('clients')
  @ApiOperation({ summary: 'Buscar todos os clientes' })
  @Get('all')
  async getAllClients(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
    @Query() filters: ILeadFilters,
  ) {
    return this.leadsService.getAllClients({ page, limit, filters });
  }

  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    example: '',
    description: 'Informe o ID do cliente para buscar detalhes',
  })
  @ApiOperation({ summary: 'Buscar clientes pela ID' })
  @Get(':id')
  async getClientsById(@Param('id') id: string) {
    if (!id) {
      throw new BadRequestException('ID é obrigatório');
    }
    return this.leadsService.getLeadById(id);
  }
}
