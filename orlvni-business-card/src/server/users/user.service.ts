import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { USER, USERDocument } from './user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(USER.name) private USERModel: Model<USERDocument>) {}

  async findAll(): Promise<USER[]> {
    return await this.USERModel.find().lean().exec();
  }

  async findOne(id: string): Promise<USER> {
    return await this.USERModel.findOne({ user_id: id }).lean().exec();
  }

  async findOneByNickname(nickname: string): Promise<USER> {
    // const queryRunner = this.connection.createQueryRunner();
    // await queryRunner.connect();
    // await queryRunner.startTransaction();
    // try {
    //   return await queryRunner.manager.findOne(USERS, {
    //     user_nickname: nickname,
    //   });
    // } catch (err) {
    //   return err;
    // } finally {
    //   await queryRunner.rollbackTransaction();
    // }

    return await this.USERModel.findOne({ user_nickname: nickname })
      .lean()
      .exec();
  }

  async createOne(item: USER): Promise<object> {
    //   const queryRunner = this.connection.createQueryRunner();
    //   await queryRunner.connect();
    //   await queryRunner.startTransaction('READ COMMITTED');
    //   const hash = await bcrypt.hash(item.user_password, 10);

    //   try {
    //     await queryRunner.query(`INSERT INTO [dbo].[USERS]
    //     ([USER_ID]
    //     ,[USER_NAME]
    //     ,[USER_BIO]
    //     ,[USER_PASSWORD]
    //     ,[USER_NICKNAME])
    // VALUES
    //     (DEFAULT
    //     ,'${item.user_name}'
    //     ,'${item.user_bio}'
    //     ,'${hash}'
    //     ,'${item.user_nickname}')`);
    //     await queryRunner.commitTransaction();
    //     return { message: 'success' };
    //   } catch (err) {
    //     await queryRunner.rollbackTransaction();
    //     return { message: 'denied' };
    //   } finally {
    //     await queryRunner.release();
    //   }

    try {
      item.user_password = await bcrypt.hash(
        item.user_password,
        Number(process.env.HASHSECRET),
      );
      await this.USERModel.create(item);
      return { message: 'success' };
    } catch {
      return { message: 'denied' };
    }
  }
}
