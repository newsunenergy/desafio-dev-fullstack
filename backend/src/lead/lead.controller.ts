import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { LeadService } from './lead.service';
import { Prisma } from '@prisma/client';
import { CreateLeadDto } from './dto/create-lead.dto';

@Controller('lead')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Post()
  create(@Body() createLeadDto: CreateLeadDto) {
    console.log(createLeadDto);
    return this.leadService.create(createLeadDto);
  }

  @Get()
  findAll() {
    return this.leadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leadService.remove(id);
  }
}
