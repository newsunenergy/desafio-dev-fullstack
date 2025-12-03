import { Module } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { DatabaseModule } from 'src/database/database.module';
import { leadProviders } from 'src/database/database.providers';
import { PdfModule } from 'src/pdf/pdf.module';

@Module({
  imports: [DatabaseModule, PdfModule],
  providers: [...leadProviders, LeadsService],
  controllers: [LeadsController],
  exports: [...leadProviders, LeadsService],
})
export class LeadsModule {}
