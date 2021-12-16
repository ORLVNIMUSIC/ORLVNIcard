import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductDTO } from './DTO/create.product.dto';
import { ProductService } from './product.service';

@Controller('server/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/available')
  async getAllAvailable() {
    return await this.productService.findAllAvailable();
  }

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
  async saveOne(@Body() item: CreateProductDTO): Promise<object> {
    return await this.productService.createOne(item);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateOne(@Param('id') id: string): Promise<object> {
    return await this.productService.updateOne(id);
  }
}
