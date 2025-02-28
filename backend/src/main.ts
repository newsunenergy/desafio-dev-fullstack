import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  //por algum santo motivo, o meu frontend fazia a req, rodava as regras de negocio e no retorno ia com erro de
  //CORS, então eu habilitei o CORS para qualquer origem para teste
  app.enableCors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type'],
  });

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
