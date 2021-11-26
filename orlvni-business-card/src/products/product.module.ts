import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PRODUCTS } from './product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PRODUCTS])],
  exports: [TypeOrmModule],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
