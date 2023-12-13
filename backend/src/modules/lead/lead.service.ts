import { Injectable } from '@nestjs/common';
import { Lead, Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class LeadService {
  constructor(private prisma: PrismaService) {}

  async createLead(data: Prisma.LeadCreateInput): Promise<Lead> {
    const alreadyExistLead = this.prisma.lead.findFirst({
      where: {
        email: data.email,
      },
    });

    if (alreadyExistLead) {
      return alreadyExistLead;
    }

    return this.prisma.lead.create({
      data,
    });
  }
}

export interface SolicitarSimulacaoDeCompensacaoEnergeticaInput {
  nomeCompleto: string;
  email: string;
  telefone: string;
  informacoesDaFatura: InformacaoDaFatura[];
}

interface InformacaoDaFatura {
  codigoDaUnidadeConsumidora: string;
  modeloFasico: string;
  enquadramento: string;
  consumoEmReais: number;
  historicoDeConsumoEmKWH: {
    consumoForaPontaEmKWH: number;
    mesDoConsumo: Date;
  }[];
}
