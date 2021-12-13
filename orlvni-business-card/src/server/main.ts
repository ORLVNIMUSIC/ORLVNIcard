import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config({
  path: '../secrets.env',
});
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: 'http://localhost:3000', credentials: true });
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
