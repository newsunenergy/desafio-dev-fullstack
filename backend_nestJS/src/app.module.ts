import { Module } from "@nestjs/common";
import { LeadController } from "./lead/lead.controller";
import { LeadService } from "./lead/lead.service";
import { HttpModule } from "@nestjs/axios";
import { PrismaService } from "./database/prisma.service";

@Module({
  imports: [HttpModule],
  controllers: [LeadController],
  providers: [LeadService, PrismaService],
})
export class AppModule {}
