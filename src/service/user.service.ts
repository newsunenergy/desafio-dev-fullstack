import { Injectable } from '@nestjs/common'
import { UserEntity } from 'src/core/domain/entities/user.entity'
import { PrismaService } from 'src/infra/prisma/prisma.service'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(user: UserEntity) {
    const response = await this.prisma.user.create({
      data: {
        name: user.name,
        password: user.password,
        email: user.email,
        phone: user.phone,
      },
    })
    return response
  }
}
