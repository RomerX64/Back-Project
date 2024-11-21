import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { preLoadProducts } from './helpers/products.preload';
import { preLoadCategorys } from './helpers/categories.preload';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    })
  )
  
  await preLoadCategorys()
  await preLoadProducts()
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
