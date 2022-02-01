import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config({
  path: './secrets.env',
});
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  console.log(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  );

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: true,
    methods: 'GET,PATCH,POST',
  });
  app.use(cookieParser());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
