import { Module } from '@nestjs/common';
import { SimulacaoService } from './simulacao.service';
import { SimulacaoController } from './simulacao.controller';
import { SimulacaoRepository } from './simulacao.repository';

@Module({
  controllers: [SimulacaoController],
  providers: [SimulacaoService, SimulacaoRepository],
})
export class SimulacaoModule {}
