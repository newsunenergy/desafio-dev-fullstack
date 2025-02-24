import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LeadModule } from "./lead/lead.module";
import { DatabaseModule } from "./database/database.module";

@Module({
  imports: [
    LeadModule,
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
