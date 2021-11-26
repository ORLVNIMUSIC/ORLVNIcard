import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductController } from './products/product.controller';
import { PRODUCTS } from './products/product.entity';
import { ProductModule } from './products/product.module';
import { ProductService } from './products/product.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'user',
      password: 'userpassword',
      migrationsTableName: 'PRODUCTS',
      database: 'WEB_STORE_DB',
      entities: [PRODUCTS],
      extra: { trustServerCertificate: true },
    }),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
