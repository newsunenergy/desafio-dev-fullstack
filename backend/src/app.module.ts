import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LeadsModule } from './leads/leads.module';
import { PdfModule } from './pdf/pdf.module';
import { validate } from './config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      validate,
      isGlobal: true,
    }),
    LeadsModule,
    PdfModule,
  ],
})
export class AppModule {}
