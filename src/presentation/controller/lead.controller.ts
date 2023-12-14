// eslint-disable-next-line prettier/prettier
import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { createReadStream, renameSync } from 'fs'
import { LeadService } from 'src/service/lead.service'
import { UserDataDTO } from 'src/shared/dtos/user-data.dto'

@Controller()
export class LeadController {
  constructor(private readonly service: LeadService) {}

  @Post('/simular')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'file' }]))
  async submitLead(
    @UploadedFiles()
    files: any,
    @Body() user: UserDataDTO,
  ) {
    const uploadedFile = files.file[0]
    //const formData = new FormData()
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const FormData = require('form-data')
    const formData = new FormData()

    renameSync(uploadedFile.path, uploadedFile.path + '.pdf')
    formData.append('file', createReadStream(uploadedFile.path + '.pdf'))
    //formData.append('file', fileBlob, uploadedFile.originalname)

    return this.service.submitLead(formData, user)
  }
}
