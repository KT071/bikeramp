import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import CONFIG from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(CONFIG.GLOBAL_PREFIX);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(CONFIG.PORT);
}
bootstrap();
