import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CreateLeadDto } from './dto/create-lead.dto';
import { FindAllQueryDto } from './dto/find-all-query.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { LeadService } from './lead.service';

@Controller('lead')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  create(
    @Body() createLeadDto: CreateLeadDto,
    @UploadedFiles() informacoesDaFatura: Express.Multer.File[],
  ) {
    return this.leadService.create(createLeadDto, informacoesDaFatura);
  }

  @Get()
  findAll(@Query() query: FindAllQueryDto) {
    return this.leadService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeadDto: UpdateLeadDto) {
    return this.leadService.update(+id, updateLeadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leadService.remove(+id);
  }
}
