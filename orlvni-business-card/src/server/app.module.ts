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
import { SuggestionModule } from './suggestions/suggestions.module';
import { SUGGESTIONS } from './suggestions/suggestion.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mongodb',
        url: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
        entities: [PRODUCTS, USERS, ORDERS, SUGGESTIONS],
        extra: {
          trustServerCertificate: true,
          useUnifiedTopology: true,
        },
      }),
    }),
    ProductModule,
    UserModule,
    ViewModule,
    AuthModule,
    OrderModule,
    SuggestionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
