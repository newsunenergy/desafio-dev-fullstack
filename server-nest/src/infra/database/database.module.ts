import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { RegisterSimulationRepository } from '@application/repositories/register-simulation-repository';
import { PrismaRegisterSimulationRepository } from './prisma/repositories/prisma-register-simulation-repository';
import { PrismaUnidadeRepository } from './prisma/repositories/prisma-unidade-repository';
import { UnidadeRepository } from '@application/repositories/unidade-repository';
import { ConsumoRepository } from '@application/repositories/consumo-repository';
import { PrismaConsumoRepository } from './prisma/repositories/prisma-consumo-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: RegisterSimulationRepository,
      useClass: PrismaRegisterSimulationRepository,
    },
    {
      provide: UnidadeRepository,
      useClass: PrismaUnidadeRepository,
    },
    {
      provide: ConsumoRepository,
      useClass: PrismaConsumoRepository,
    },
  ],
  exports: [
    PrismaService,
    RegisterSimulationRepository,
    UnidadeRepository,
    ConsumoRepository,
  ],
})
export class DatabaseModule {}
