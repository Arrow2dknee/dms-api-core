import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { urlencoded, json } from 'express';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));

  const PORT = 5000;
  await app.listen(PORT, () => {
    console.log(`API server running on port: ${PORT}`);
  });
}
bootstrap();
