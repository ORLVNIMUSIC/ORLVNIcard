import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PRODUCTS } from './products/product.entity';
import { ProductModule } from './products/product.module';
import { USERS } from './users/user.entity';
import { UserModule } from './users/user.module';
import { ViewModule } from './view/view.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mssql',
        host: 'localhost',
        port: 1433,
        username: 'user',
        password: 'userpassword',
        options: {
          isolation: 'SNAPSHOT',
        },
        migrationsTableName: 'PRODUCTS',
        database: 'WEB_STORE_DB',
        entities: [PRODUCTS, USERS],
        extra: { trustServerCertificate: true },
      }),
    }),
    ProductModule,
    UserModule,
    ViewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
