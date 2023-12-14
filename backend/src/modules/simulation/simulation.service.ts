import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { OutputCreateSimulationDto } from './simulation.dto';

import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UnitService } from 'src/modules/unit/unit.service';
import { LeadService } from 'src/modules/lead/lead.service';
import { InputCreateLeadDto } from 'src/modules/lead/lead.dto';

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
    data: InputCreateLeadDto,
  ): Promise<OutputCreateSimulationDto> {
    const createdLead = await this.lead.createLead({
      email: data.email,
      nomeCompleto: data.nomeCompleto,
      telefone: data.telefone,
    });

    const createdUnits = await this.unit.createManyUnits(
      data.informacoesDaFatura.map((fatura) => ({
        codigoDaUnidadeConsumidora: fatura.codigoDaUnidadeConsumidora,
        enquadramento: fatura.enquadramento,
        modeloFasico: fatura.modeloFasico,
        leadId: createdLead.id,
      })),
    );

    console.log(createdUnits);

    return {
      message: 'Simulação criada com sucesso!',
    };
  }
}
