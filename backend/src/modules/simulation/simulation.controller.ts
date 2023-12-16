import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Prisma, Unit } from '@prisma/client';
import { SimulationService } from './simulation.service';
import { InputCreateLeadDto } from 'src/modules/lead/lead.dto';
import {
  OutputCreateSimulationDto,
  validSortingFields,
} from './simulation.dto';
import { SortingPropertyParams } from 'src/helpers/decorators/sorting.decorator';

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
  async listUnits(
    @Query('search') search?: string,
    @SortingPropertyParams(validSortingFields)
    orderBy?: Prisma.UnitOrderByWithRelationInput,
  ): Promise<Unit[]> {
    return this.service.listSimulations({
      search,
      orderBy,
    });
  }

  @Get('/simulations/:leadId')
  async listUnitsByLeadId(
    @Query('search') search?: string,
    @SortingPropertyParams(validSortingFields)
    orderBy?: Prisma.UnitOrderByWithRelationInput,
    @Param('leadId') leadId?: string,
  ): Promise<Unit[]> {
    return this.service.listSimulations({
      leadId,
      search,
      orderBy,
    });
  }
}
