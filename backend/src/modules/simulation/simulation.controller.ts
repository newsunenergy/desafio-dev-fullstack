import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Unit } from '@prisma/client';
import { SimulationService } from './simulation.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { InputCreateLeadDto } from 'src/modules/lead/lead.dto';
import { OutputCreateSimulationDto } from './simulation.dto';

@Controller()
export class SimulationController {
  constructor(private readonly service: SimulationService) {}

  @Post('/simulate')
  @UseInterceptors(FilesInterceptor('files'))
  createLead(
    @Body() data: InputCreateLeadDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'application/pdf' })],
      }),
    )
    files: Array<Express.Multer.File>,
  ): Promise<OutputCreateSimulationDto> {
    return this.service.createSimulation(data, files);
  }

  @Get('/simulations')
  async listUnits(): Promise<Unit[]> {
    return this.service.listSimulations({});
  }

  @Get('/simulations/:leadId')
  async listUnitsByLeadId(@Param('leadId') leadId: string): Promise<Unit[]> {
    return this.service.listSimulations({
      where: {
        leadId,
      },
    });
  }
}
