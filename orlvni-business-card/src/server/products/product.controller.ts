import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateProductDTO } from './DTO/create.product.dto';
import { ProductService } from './product.service';

@Controller('products_db')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAll() {
    return await this.productService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.productService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async saveOne(@Body() item: CreateProductDTO): Promise<void> {
    await this.productService.createOne(item);
  }
}
