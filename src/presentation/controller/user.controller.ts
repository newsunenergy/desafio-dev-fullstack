import { Body, Controller, Post } from '@nestjs/common'
import { UserEntity } from 'src/core/domain/entities/user.entity'
import { UserService } from 'src/service/user.service'

@Controller('api/user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  async createUser(@Body() user: UserEntity) {
    const response = this.service.create(user)
    return response
  }
}
