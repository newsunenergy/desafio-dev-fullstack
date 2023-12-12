import { Body, Controller, Post } from '@nestjs/common';
import { LeadService } from './lead.service';
import { Lead } from '@prisma/client';
import { SolicitarSimulacaoDeCompensacaoEnergeticaInput } from './lead.service';
import { CreateLeadDto } from './lead.dto';

@Controller()
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Post('/simulate')
  createLead(@Body() postData: CreateLeadDto): Promise<Lead> {
    return this.leadService.createLead(postData);
  }
}
