import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PRODUCTS } from './products/product.entity';
import { ProductModule } from './products/product.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
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
    }),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
