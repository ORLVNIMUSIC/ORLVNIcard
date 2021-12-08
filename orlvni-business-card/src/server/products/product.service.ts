import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { PRODUCTS } from './product.entity';

@Injectable()
export class ProductService {
  constructor(private connection: Connection) {}

  async findAll(): Promise<PRODUCTS[]> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      return await queryRunner.manager.find(PRODUCTS);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return err;
    } finally {
      await queryRunner.release();
    }
  }

  async findOne(id: string): Promise<PRODUCTS> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      return await queryRunner.manager.findOne(PRODUCTS, id);
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      return err;
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }
}
