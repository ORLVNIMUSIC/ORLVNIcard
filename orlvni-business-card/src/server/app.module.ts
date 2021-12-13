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
        host: process.env.DB_HOST,
        port: 1433,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        options: {
          isolation: 'SNAPSHOT',
        },
        database: process.env.DB_TABLE,
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
