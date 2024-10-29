import { Module } from "@nestjs/common";
import { LeadService } from "./lead.service";
import { LeadController } from "./lead.controller";
import { PrismaService } from "src/database/prisma.service";

@Module({
  controllers: [LeadController],
  providers: [PrismaService, LeadService],
})
export class LeadModule {}
