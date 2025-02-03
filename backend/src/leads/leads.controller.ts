  import {
    Controller,
    Get,
    Post,
    Delete,
    Body,
    Param,
    Query,
    UseInterceptors,
    UploadedFile,
  } from '@nestjs/common';
  import { LeadsService } from './leads.service';
  import { CreateLeadDto } from './dto/create-lead.dto';
  import { FileInterceptor } from '@nestjs/platform-express';

  @Controller('leads')
  export class LeadsController {
    constructor(private readonly leadsService: LeadsService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async createLead(
      @Body() data: CreateLeadDto,
      @UploadedFile() file: Express.Multer.File,
    ) {
      console.log('file', file);
      const result = await this.leadsService.createLead(data, file);
      return result;
    }

    @Get()
    getAllLeads(
      @Query('name') name?: string,
      @Query('email') email?: string,
      @Query('ConsumerUnitCode') ConsumerUnitCode?: string,
    ) {
      return this.leadsService.getLeads({
        name,
        email,
        ConsumerUnitCode,
      });
    }

    @Get(':id')
    getLeadById(@Param('id') id: string) {
      return this.leadsService.getLeadById(id);
    }

    @Delete(':id')
    deleteLeadById(@Param('id') id: string) {
      return this.leadsService.deleteLeadById(id);
    }
  }
