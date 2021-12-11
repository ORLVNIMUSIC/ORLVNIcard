import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { ORDERS } from './order.entity';
import { OrderService } from './order.service';

@Module({
  imports: [TypeOrmModule.forFeature([ORDERS])],
  exports: [TypeOrmModule],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
