import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class UnitService {
  constructor(private prisma: PrismaService) {}

  async listUnits(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UnitWhereUniqueInput;
    where?: Prisma.UnitWhereInput;
    orderBy?: Prisma.UnitOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.unit.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        Lead: true,
      },
    });
  }

  async createUnit(data: Prisma.UnitUncheckedCreateInput) {
    const alreadyExistUnit = await this.prisma.unit.findFirst({
      where: {
        codigoDaUnidadeConsumidora: data.codigoDaUnidadeConsumidora,
      },
    });

    if (alreadyExistUnit) {
      return null;
    }

    return this.prisma.unit.create({
      data,
    });
  }
}
