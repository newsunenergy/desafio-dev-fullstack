import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class UnitService {
  constructor(private prisma: PrismaService) {}

  async listUnits(params: {
    where?: Prisma.UnitWhereInput;
    orderBy?: Prisma.UnitOrderByWithRelationInput;
  }) {
    const { where, orderBy } = params;

    return this.prisma.unit.findMany({
      where,
      orderBy,
      include: {
        lead: true,
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
