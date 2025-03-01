import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { SimulacaoService } from './simulacao.service';
import { CreateSimulacaoDto } from './dto/create-simulacao.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('simulacao')
export class SimulacaoController {
  constructor(private readonly simulacaoService: SimulacaoService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async create(
    @Body() createSimulacaoDto: CreateSimulacaoDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('Nenhum arquivo foi enviado');
    }

    const response = await this.simulacaoService.create(
      createSimulacaoDto,
      files,
    );
    return response;
  }

  @Get()
  async findAll() {
    return await this.simulacaoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.simulacaoService.findOne(id);
  }
}
