import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { CreateProductDTO } from './DTO/create.product.dto';
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
      return err;
    } finally {
      await queryRunner.rollbackTransaction();
    }
  }

  async findAllAvailable(): Promise<PRODUCTS[]> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      return await queryRunner.manager.find(PRODUCTS, {
        where: { product_availability: 1 },
      });
    } catch (err) {
      return err;
    } finally {
      await queryRunner.rollbackTransaction();
    }
  }

  async findOne(id: string): Promise<PRODUCTS> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      return await queryRunner.manager.findOne(PRODUCTS, id);
    } catch (err) {
      return err;
    } finally {
      await queryRunner.rollbackTransaction();
    }
  }

  async createOne(item: CreateProductDTO): Promise<object> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('READ COMMITTED');
    try {
      await queryRunner.query(`INSERT INTO [dbo].[PRODUCTS]
    ([PRODUCT_ID]
    ,[PRODUCT_NAME]
    ,[PRODUCT_DESC]
    ,[PRODUCT_COST]
    ,[PRODUCT_AVAILABILITY]
    ,[USER_ID])
VALUES
    (DEFAULT
    ,'${item.product_name}'
    ,'${item.product_desc}'
    ,'${item.product_cost}'
    ,1
    ,'${item.user_id}')`);
      await queryRunner.commitTransaction();
      return { message: 'success' };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return { message: 'denied' };
    } finally {
      await queryRunner.release();
    }
  }

  async updateOne(id: string): Promise<object> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('REPEATABLE READ');
    try {
      await queryRunner.query(`UPDATE [dbo].[PRODUCTS]
      SET [PRODUCT_AVAILABILITY] = 0
    WHERE [PRODUCT_ID] = '${id}'`);
      await queryRunner.commitTransaction();
      return { message: 'success' };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return { message: 'denied' };
    } finally {
      await queryRunner.release();
    }
  }
}
