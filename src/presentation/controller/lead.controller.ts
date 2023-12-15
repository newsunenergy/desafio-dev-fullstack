// eslint-disable-next-line prettier/prettier
import { BadRequestException, Body, Controller, Get, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { isEmpty, isNotEmptyObject } from 'class-validator'
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
    if (isEmpty(user)) {
      return new BadRequestException(
        'Nome, email e telefone precisam estar preenchidos',
      )
    }
    if (isEmpty(requestFile)) {
      return new BadRequestException('Selecione um pdf para continuar')
    }
    return this.leadService.submitLead(requestFile, user)
  }

  @Get('/listagem')
  async getAllLeads(@Query() query?: any) {
    if (!isNotEmptyObject(query)) {
      return this.leadService.getAllLeads()
    }
    return this.leadService.getBy(query)
  }
}
