import { Body, Controller, Post } from '@nestjs/common'
import { LeadService } from 'src/service/lead.service'
import { UserDTO } from 'src/shared/dtos/user.dto'

@Controller()
export class LeadController {
  constructor(private readonly service: LeadService) {}

  @Post('/simular')
  async submitLead(@Body() data: FormData) {
    console.log('before service')
    const response = this.service.submitLead(data)
    return response
  }
}
