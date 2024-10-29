import { Module } from "@nestjs/common";
import { LeadController } from "./lead/lead.controller";
import { LeadService } from "./lead/lead.service";

@Module({
  imports: [],
  controllers: [LeadController],
  providers: [LeadService],
})
export class AppModule {}
