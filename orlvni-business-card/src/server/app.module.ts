import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PRODUCTS } from './products/product.entity';
import { ProductModule } from './products/product.module';
import { USERS } from './users/user.entity';
import { UserModule } from './users/user.module';
import { ViewModule } from './view/view.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './orders/order.module';
import { ORDERS } from './orders/order.entity';

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
        entities: [PRODUCTS, USERS, ORDERS],
        extra: { trustServerCertificate: true },
      }),
    }),
    ProductModule,
    UserModule,
    ViewModule,
    AuthModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
