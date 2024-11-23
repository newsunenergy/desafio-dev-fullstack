import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { SimulationService } from './simulation.service';
import { FormDataRequest } from 'nestjs-form-data';
import { ZodValidation } from 'src/validation/zod.validation';
import { SimulationSchema } from './simulation.validation';
import { QueryListaSimulacoesDto, SimulationDTO } from './simulation.dto';

@Controller('simulacao')
export class SimulationController {
  constructor(private simulacaoService: SimulationService) {}

  @Post()
  @FormDataRequest()
  async criarSimulacao(
    @Body(new ZodValidation(SimulationSchema)) body: SimulationDTO,
  ) {
    const { nomeCompleto, email, telefone, arquivo } = body;

    return this.simulacaoService.criarSimulacao({
      nomeCompleto,
      email,
      telefone,
      arquivo,
    });
  }

  @Get()
  async listarSimulacoes(@Query() query: QueryListaSimulacoesDto) {
    return this.simulacaoService.listarLeads(query);
  }

  @Get(':id')
  async buscarSimulacao(@Param('id') id: string) {
    return this.simulacaoService.buscarLeadPorId(id);
  }
}
