import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LeadsModule } from './leads/leads.module';
import { PdfModule } from './pdf/pdf.module';
import { LeadsController } from './leads/leads.controller';
import { PdfController } from './pdf/pdf.controller';
import { LeadsService } from './leads/leads.service';
import { PdfService } from './pdf/pdf.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal: true,
    }),
    LeadsModule,
    PdfModule,
  ],
  controllers: [LeadsController, PdfController],
  providers: [LeadsService, PdfService],
})
export class AppModule {}
