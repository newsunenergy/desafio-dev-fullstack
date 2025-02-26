import { APP_PIPE } from '@nestjs/core'
import { ZodValidationPipe } from 'nestjs-zod'

export default {
  provide: APP_PIPE,
  useClass: ZodValidationPipe,
}
