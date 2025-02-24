import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  Get,
  Query,
  Param,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { LeadService } from './lead.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { Lead } from './entities/lead.entity';
import { LeadFilterDto } from './dto/lead-filter.dto';

@Controller('lead')
export class LeadController {
  constructor(private readonly leadService: LeadService) { }

  @Post('create')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'files' }]))
  async createLead(
    @Body() data: CreateLeadDto,
    @UploadedFiles() files: { files: Express.Multer.File[] },
  ): Promise<Lead> {
    return this.leadService.createLead(data, files.files);
  }

  @Get()
  async findAll(@Query() filter: LeadFilterDto): Promise<Lead[]> {
    return this.leadService.findAll(filter);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Lead> {
    return await this.leadService.findById(id);
  }
}
