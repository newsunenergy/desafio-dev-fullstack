import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common'
import { LeadsService } from './leads.service'
import { FilesInterceptor } from '@nestjs/platform-express'
import { LeadCreationDto, LeadsGetDto } from './dtos/leads.dto'

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  uploadFile(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: LeadCreationDto,
  ) {
    return this.leadsService.createLead(body, files)
  }

  @Get(':id')
  getLeadById(@Param('id') id: string) {
    return this.leadsService.getLeadById(id)
  }

  @Get()
  getLeads(@Query() query: LeadsGetDto) {
    return this.leadsService.getLeads(query)
  }
}
