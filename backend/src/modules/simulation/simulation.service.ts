import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { OutputCreateSimulationDto } from './simulation.dto';

import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UnitService } from 'src/modules/unit/unit.service';
import { LeadService } from 'src/modules/lead/lead.service';
import { InputCreateLeadDto } from 'src/modules/lead/lead.dto';
import { ConsumoService } from 'src/modules/consumo/consumo.service';

@Injectable()
export class SimulationService {
  constructor(
    private unit: UnitService,
    private lead: LeadService,
    private consumo: ConsumoService,
  ) {}

  async listSimulations(params: {
    leadId?: string;
    search?: string;
    orderBy?: Prisma.UnitOrderByWithRelationInput;
  }) {
    const { orderBy, search, leadId } = params;

    let where;

    if (leadId) {
      where = {
        leadId,
      };
    }

    // if (search) {
    //   where = {
    //     nomeCompleto:
    //   }
    // }

    return this.unit.listUnits({
      where,
      orderBy,
    });
  }

  async createSimulation(
    data: InputCreateLeadDto,
  ): Promise<OutputCreateSimulationDto> {
    if (data.informacoesDaFatura.length == 0) {
      throw new BadRequestException('A lista de faturas está vazia');
    }

    const createdLead = await this.lead.createLead({
      email: data.email,
      nomeCompleto: data.nomeCompleto,
      telefone: data.telefone,
    });

    await Promise.all(
      data.informacoesDaFatura.map(async (fatura) => {
        if (fatura.historicoDeConsumoEmKWH.length != 12) return;

        const createdUnit = await this.unit.createUnit({
          codigoDaUnidadeConsumidora: fatura.codigoDaUnidadeConsumidora,
          consumoEmReais: fatura.consumoEmReais,
          enquadramento: fatura.enquadramento,
          modeloFasico: fatura.modeloFasico,
          leadId: createdLead.id,
        });

        if (!createdUnit) return;

        const createdConsumos = await this.consumo.createManyConsumos(
          fatura.historicoDeConsumoEmKWH.map((consumo) => ({
            ...consumo,
            unitId: createdUnit.id,
          })),
        );

        if (!createdConsumos) return;

        return;
      }),
    );

    return {
      message: 'Simulação realizada com sucesso!',
    };
  }
}
