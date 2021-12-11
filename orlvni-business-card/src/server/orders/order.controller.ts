import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateOrderDTO } from './DTO/create.order.dto';
import { ORDERS } from './order.entity';
import { OrderService } from './order.service';

@Controller('server/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<ORDERS[]> {
    return await this.orderService.findAll(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async saveOne(@Body() item: CreateOrderDTO): Promise<object> {
    return await this.orderService.createOne(item);
  }
}
