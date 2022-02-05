import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ORDER } from './order.schema';
import { OrderService } from './order.service';

@Controller('server/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get(':id')
  async getAllByID(@Param('id') id: string): Promise<ORDER[]> {
    return await this.orderService.findAllByID(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async saveOne(@Body() item): Promise<object> {
    return await this.orderService.createOne(item);
  }
}
