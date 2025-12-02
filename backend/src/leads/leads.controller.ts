import {
  Controller,
  Post,
  Get,
  Query,
  Param,
  Body,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { LeadsService } from './leads.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

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
    @Body() body: any,
    @UploadedFiles() files: { faturas?: Express.Multer.File[] },
  ) {
    const { nomeCompleto, email, telefone } = body;
    return this.leadsService.criarSimulacao({
      nomeCompleto,
      email,
      telefone,
      faturas: files?.faturas || [],
    });
  }

  @Get()
  async listar(
    @Query('nome') nome?: string,
    @Query('email') email?: string,
    @Query('codigoUC') codigoUC?: string,
  ) {
    return this.leadsService.listar({ nome, email, codigoUC });
  }

  @Get(':id')
  async buscarPorId(@Param('id') id: string) {
    return this.leadsService.buscarPorId(id);
  }
}