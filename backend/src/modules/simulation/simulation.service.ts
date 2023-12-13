import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { OutputCreateSimulationDto } from './simulation.dto';

import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UnitService } from 'src/modules/unit/unit.service';
import { LeadService } from '../lead/lead.service';

@Injectable()
export class SimulationService {
  constructor(
    private prisma: PrismaService,
    private unit: UnitService,
    private lead: LeadService,
  ) {}

  async listSimulations(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UnitWhereUniqueInput;
    where?: Prisma.UnitWhereInput;
    orderBy?: Prisma.UnitOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.unit.listUnits({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createSimulation(
    data: Prisma.LeadCreateInput,
    files: Array<Express.Multer.File>,
  ): Promise<OutputCreateSimulationDto> {
    await this.lead.createLead(data);

    // TODO subir arquivos

    return {
      message: ['Simulação criada com sucesso!'],
    };
  }
}
