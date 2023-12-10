import { Injectable } from '@nestjs/common';
import { Lead, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LeadService {
  constructor(private prisma: PrismaService) {}

  async createLead(data: Prisma.LeadCreateInput): Promise<Lead> {
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
