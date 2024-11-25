import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { auth } from 'express-openid-connect';
import {config as auth0Config} from './config/auth0.config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(auth(auth0Config))
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    })
  )
  
  const swaggerConfig = new DocumentBuilder()
  .setTitle('Documentacion de la API')
  .addBearerAuth()
  .setDescription('Documentacion de la API de la tienda online')
  .setVersion('1.0.0').build()
  

  const document = SwaggerModule.createDocument(app,swaggerConfig)
  SwaggerModule.setup('api', app, document)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
