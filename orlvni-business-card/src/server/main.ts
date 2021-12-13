import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config({
  path: './secrets.env',
});
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true, credentials: true });
  app.use(cookieParser());
  await app.listen(process.env.PORT || 3000, () =>
    console.log(`url-shortener listening on port ${process.env.PORT}!`),
  );
}
bootstrap();
