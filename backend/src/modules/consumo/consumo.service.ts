import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class ConsumoService {
  constructor(private prisma: PrismaService) {}

  async listConsumos(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ConsumoWhereUniqueInput;
    where?: Prisma.ConsumoWhereInput;
    orderBy?: Prisma.ConsumoOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.consumo.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createManyConsumos(data: Prisma.ConsumoCreateManyInput[]) {
    return this.prisma.consumo.createMany({
      data,
      skipDuplicates: true,
    });
  }
}
