import {
  Controller,
  Post,
  Get,
  Query,
  Param,
  Body,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { LeadsService } from './leads.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateLeadDto } from './dto/create-lead.dto';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post('simular')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'faturas', maxCount: 10 },
    ]),
  )
  async simular(
    @Body() body: CreateLeadDto,
    @UploadedFiles() files: { faturas?: Express.Multer.File[] },
  ) {
    if (!files?.faturas || files.faturas.length === 0) {
      throw new BadRequestException('Pelo menos uma fatura é obrigatória');
    }

    return this.leadsService.criarSimulacao({
      ...body,
      faturas: files.faturas,
    });
  }

  @Get()
  async listar(@Query('filtro') filtro?: string) {
    return this.leadsService.listar(filtro);
  }

  @Get(':id')
  async buscarPorId(@Param('id') id: string) {
    return this.leadsService.buscarPorId(id);
  }
}