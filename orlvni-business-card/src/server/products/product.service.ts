import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PRODUCT, PRODUCTDocument } from './product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(PRODUCT.name) private PRODUCTModel: Model<PRODUCTDocument>,
  ) {}

  async findAll(): Promise<PRODUCT[]> {
    return await this.PRODUCTModel.find().lean().exec();
  }

  async findAllAvailable(): Promise<PRODUCT[]> {
    return await this.PRODUCTModel.find({ product_availability: true })
      .lean()
      .exec();
  }

  async findOne(id: string): Promise<PRODUCT> {
    return await this.PRODUCTModel.findOne({ product_id: id }).lean().exec();
  }

  async createOne(item): Promise<object> {
    //     const queryRunner = this.connection.createQueryRunner();
    //     await queryRunner.connect();
    //     await queryRunner.startTransaction('READ COMMITTED');
    //     try {
    //       await queryRunner.query(`INSERT INTO [dbo].[PRODUCTS]
    //     ([PRODUCT_ID]
    //     ,[PRODUCT_NAME]
    //     ,[PRODUCT_DESC]
    //     ,[PRODUCT_COST]
    //     ,[PRODUCT_AVAILABILITY]
    //     ,[USER_ID])
    // VALUES
    //     (DEFAULT
    //     ,'${item.product_name}'
    //     ,'${item.product_desc}'
    //     ,'${item.product_cost}'
    //     ,1
    //     ,'${item.user_id}')`);
    //       await queryRunner.commitTransaction();
    //       return { message: 'success' };
    //     } catch (err) {
    //       await queryRunner.rollbackTransaction();
    //       return { message: 'denied' };
    //     } finally {
    //       await queryRunner.release();
    //     }
    try {
      await this.PRODUCTModel.create(item);
      return { message: 'success' };
    } catch {
      return { message: 'denied' };
    }
  }

  async updateOne(id: string): Promise<object> {
    // const queryRunner = this.connection.createQueryRunner();
    // await queryRunner.connect();
    // await queryRunner.startTransaction('REPEATABLE READ');
    // try {
    //   await queryRunner.query(`UPDATE [dbo].[PRODUCTS]
    //   SET [PRODUCT_AVAILABILITY] = 0
    // WHERE [PRODUCT_ID] = '${id}'`);
    //   await queryRunner.commitTransaction();
    //   return { message: 'success' };
    // } catch (err) {
    //   await queryRunner.rollbackTransaction();
    //   return { message: 'denied' };
    // } finally {
    //   await queryRunner.release();
    // }
    try {
      await this.PRODUCTModel.updateOne(
        { product_id: id },
        { $set: { product_availability: false } },
      );
      return { message: 'success' };
    } catch {
      return { message: 'denied' };
    }
  }
}
