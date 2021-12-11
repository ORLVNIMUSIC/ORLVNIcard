import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { CreateOrderDTO } from './DTO/create.order.dto';
import { ORDERS } from './order.entity';

@Injectable()
export class OrderService {
  constructor(private connection: Connection) {}

  async findAll(id: string): Promise<ORDERS[]> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      return await queryRunner.manager.find(ORDERS, { user_id: id });
    } catch (err) {
      return err;
    } finally {
      await queryRunner.rollbackTransaction();
    }
  }

  async createOne(item: CreateOrderDTO): Promise<object> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('READ COMMITTED');
    try {
      await queryRunner.query(`INSERT INTO [dbo].[ORDERS]
    ([ORDER_ID]
    ,[PRODUCT_ID]
    ,[USER_ID])
VALUES
    (DEFAULT
    ,'${item.product_id}'
    ,'${item.user_id}')`);
      await queryRunner.commitTransaction();
      return { message: 'Good' };
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
