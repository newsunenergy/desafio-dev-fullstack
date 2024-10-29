import { Controller, Get, Post, Body, Param, UploadedFile } from "@nestjs/common";
import { LeadService } from "./lead.service";
import { CreateLeadDto } from "./dto/create-lead.dto";

@Controller("lead")
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Post()
  async create(@Body() data: CreateLeadDto, @UploadedFile() files: Express.Multer.File[]) {
    try {
      const filesDecoded = await Promise.all(files.map((file) => this.leadService.decodeBillPDF(file)));
      const createdLead = await this.leadService.createLead(data);
      const filesDecodedWithLeadID = filesDecoded.map((file) =>
        this.leadService.leadPDFtoCreateUnityDTO(file, createdLead.id)
      );
      await Promise.all(filesDecodedWithLeadID.map((file) => this.leadService.createUnit(file)));
      return this.leadService.findOne(createdLead.id);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  findAll() {
    return this.leadService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.leadService.findOne(id);
  }
}
