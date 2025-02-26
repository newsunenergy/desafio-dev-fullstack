import { Module } from '@nestjs/common'
import { ZodValidation } from './pipes'
import { CORE_MODULES } from './core'

@Module({
  imports: [...CORE_MODULES],
  controllers: [],
  providers: [ZodValidation],
})
export class AppModule {}
