import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { LeadModule } from './lead/lead.module';

@Module({
  imports: [DatabaseModule, LeadModule],
})
export class AppModule {}
