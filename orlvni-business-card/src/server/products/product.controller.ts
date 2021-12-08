import { Controller, Get, Param } from '@nestjs/common';
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
}
