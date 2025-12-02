import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SimulacaoController } from './presentation/controllers/simulacao.controller';
import { CriarSimulacaoUseCase } from './application/use-cases/criar-simulacao.use-case';
import { ListarSimulacoesUseCase } from './application/use-cases/listar-simulacoes.use-case';
import { BuscarSimulacaoPorIdUseCase } from './application/use-cases/buscar-simulacao-por-id.use-case';
import { PrismaService } from './infrastructure/database/prisma.service';
import { PrismaLeadRepository } from './infrastructure/repositories/prisma-lead.repository';
import { MagicPdfService } from './infrastructure/external/magic-pdf.service';

@Module({
  imports: [ConfigModule],
  controllers: [SimulacaoController],
  providers: [
    CriarSimulacaoUseCase,
    ListarSimulacoesUseCase,
    BuscarSimulacaoPorIdUseCase,
    PrismaService,
    {
      provide: 'ILeadRepository',
      useClass: PrismaLeadRepository,
    },
    MagicPdfService,
  ],
  exports: [PrismaService],
})
export class SimulacaoModule {}
