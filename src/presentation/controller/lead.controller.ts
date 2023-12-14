// eslint-disable-next-line prettier/prettier
import { BadRequestException, Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { isEmpty } from 'class-validator'
import { log } from 'console'
import { LeadService } from 'src/service/lead.service'
import { UserDataDTO } from 'src/shared/dtos/user-data.dto'

@Controller()
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Post('/simular')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'file' }]))
  async submitLead(
    @UploadedFiles()
    requestFile: File,
    @Body() user: UserDataDTO,
  ) {
    log('CHECK 1\n\n\n\n\n')
    if (isEmpty(user)) {
      return new BadRequestException(
        'Nome, email e telefone precisam estar preenchidos',
      )
    }
    log('CHECK 2\n\n\n\n\n')
    if (isEmpty(requestFile)) {
      return new BadRequestException('Selecione um pdf para continuar')
    }
    this.leadService.submitLead(requestFile, user)
  }
}
