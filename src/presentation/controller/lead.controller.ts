// eslint-disable-next-line prettier/prettier
import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { plainToInstance } from 'class-transformer'
import { LeadService } from 'src/service/lead.service'
import { LeadFormRequest } from 'src/shared/dtos/lead-form-request.dto'

@Controller()
export class LeadController {
  constructor(private readonly service: LeadService) {}

  @Post('/simular')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'file' }]))
  async submitLead(
    @UploadedFiles()
    files: any,
    @Body() rawUser: any,
  ) {
    console.log(files)
    const uploadedFile = files.file[0]
    const user = LeadFormRequest.mapFrom(rawUser)
    user.file = uploadedFile
    const formData = new FormData()
    const fileBlob = new Blob([uploadedFile.buffer], {
      type: uploadedFile.mimetype,
    })

    formData.append('file', fileBlob, uploadedFile.originalname)

    console.log(uploadedFile)

    const response = this.service.submitLead(formData)
    return response
  }
}
