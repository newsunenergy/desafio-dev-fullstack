import { Module } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { DatabaseModule } from 'src/database/database.module';
import {
  consumptionProviders,
  leadProviders,
  unitProviders,
} from 'src/database.providers';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...leadProviders,
    ...unitProviders,
    ...consumptionProviders,
    LeadsService,
  ],
  controllers: [LeadsController],
})
export class LeadsModule {}
