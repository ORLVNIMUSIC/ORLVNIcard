import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PRODUCT, PRODUCTSchema } from './product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PRODUCT.name, schema: PRODUCTSchema }]),
  ],
  exports: [MongooseModule],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
