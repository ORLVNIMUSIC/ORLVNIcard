import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products_db')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAll() {
    return this.productService.findAll();
  }
}
