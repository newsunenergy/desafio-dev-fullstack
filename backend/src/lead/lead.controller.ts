import { Body, Controller, Post } from '@nestjs/common';
import { LeadService } from './lead.service';
import { Lead } from '@prisma/client';
import { SolicitarSimulacaoDeCompensacaoEnergeticaInput } from './lead.service';

@Controller()
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Post('/simulate')
  createLead(
    @Body() postData: SolicitarSimulacaoDeCompensacaoEnergeticaInput,
  ): Promise<Lead> {
    return this.leadService.createLead(postData);
  }
}
