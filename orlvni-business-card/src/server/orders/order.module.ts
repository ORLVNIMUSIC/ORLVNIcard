import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { ORDER, ORDERSchema } from './order.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderService } from './order.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ORDER.name, schema: ORDERSchema }]),
  ],
  exports: [MongooseModule],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
