import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './products/product.module';
import { UserModule } from './users/user.module';
import { ViewModule } from './view/view.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './orders/order.module';
import { SuggestionModule } from './suggestions/suggestions.module';
require('dotenv').config({
  path: './secrets.env',
});

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    ),
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
