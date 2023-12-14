import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Unit } from '@prisma/client';
import { SimulationService } from './simulation.service';
import { InputCreateLeadDto } from 'src/modules/lead/lead.dto';
import { OutputCreateSimulationDto } from './simulation.dto';

@Controller()
export class SimulationController {
  constructor(private readonly service: SimulationService) {}

  @Post('/simulate')
  createLead(
    @Body() data: InputCreateLeadDto,
  ): Promise<OutputCreateSimulationDto> {
    return this.service.createSimulation(data);
  }

  @Get('/simulations')
  async listUnits(): Promise<Unit[]> {
    return this.service.listSimulations({});
  }

  @Get('/simulations/:leadId')
  async listUnitsByLeadId(@Param('leadId') leadId: string): Promise<Unit[]> {
    return this.service.listSimulations({
      where: {
        leadId,
      },
    });
  }
}
