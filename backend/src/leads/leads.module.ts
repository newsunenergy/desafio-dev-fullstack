import { Module } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { DatabaseModule } from 'src/database/database.module';
import { leadProviders } from 'src/database.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...leadProviders, LeadsService],
  controllers: [LeadsController],
})
export class LeadsModule {}
