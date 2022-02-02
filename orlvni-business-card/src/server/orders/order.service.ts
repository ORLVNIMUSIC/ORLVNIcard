import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ORDER, ORDERDocument } from './order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(ORDER.name)
    private ORDERModel: Model<ORDERDocument>,
  ) {}

  async findAll(id: string): Promise<ORDER[]> {
    return await this.ORDERModel.find().lean().exec();
  }

  async createOne(item): Promise<object> {
    //   const queryRunner = this.connection.createQueryRunner();
    //   await queryRunner.connect();
    //   await queryRunner.startTransaction();
    //   const findResult = await queryRunner.manager.find(ORDERS, {
    //     product_id: item.product_id,
    //   });
    //   await queryRunner.rollbackTransaction();
    //   if (findResult.length === 0) {
    //     await queryRunner.connect();
    //     await queryRunner.startTransaction('READ COMMITTED');
    //     try {
    //       await queryRunner.query(`INSERT INTO [dbo].[ORDERS]
    //     ([ORDER_ID]
    //     ,[PRODUCT_ID]
    //     ,[USER_ID])
    // VALUES
    //     (DEFAULT
    //     ,'${item.product_id}'
    //     ,'${item.user_id}')`);
    //       await queryRunner.commitTransaction();
    //       return { message: 'success' };
    //     } catch (err) {
    //       await queryRunner.rollbackTransaction();
    //       return { message: 'denied' };
    //     } finally {
    //       await queryRunner.release();
    //     }
    //   } else {
    //     return { message: 'denied' };
    //   }

    return await this.ORDERModel.create(item);
  }
}
