import { Injectable } from '@nestjs/common';
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
    });
  }

  async createUnit(data: Prisma.UnitCreateInput) {
    return this.prisma.unit.create({
      data,
    });
  }
}
