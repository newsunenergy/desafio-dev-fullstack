import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Unit } from '@prisma/client';
import { UnitService } from './unit.service';

@Controller()
export class UnitController {
  constructor(private readonly service: UnitService) {}

  @Get('/unit')
  async listUnits(): Promise<Unit[]> {
    return this.service.listUnits({});
  }

  @Get('/unit/:leadId')
  async listUnitsByLeadId(@Param('leadId') leadId: string): Promise<Unit[]> {
    return this.service.listUnits({
      where: {
        leadId,
      },
    });
  }
}
