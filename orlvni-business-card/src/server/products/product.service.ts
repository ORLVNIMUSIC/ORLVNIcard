import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PRODUCTS } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(PRODUCTS)
    private productsRepository: Repository<PRODUCTS>,
  ) {}

  findAll(): Promise<PRODUCTS[]> {
    return this.productsRepository.find();
  }

  findOne(id: string): Promise<PRODUCTS> {
    return this.productsRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.productsRepository.delete(id);
  }
}
