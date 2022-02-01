import { Injectable } from '@nestjs/common';
import { Connection, getMongoManager } from 'typeorm';
import { USERS } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private connection: Connection) {}

  async findAll(): Promise<USERS[]> {
    const manager = getMongoManager();

    return await manager.find();
  }

  async findOne(id: string): Promise<USERS> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      return await queryRunner.manager.findOne(USERS, id);
    } catch (err) {
      return err;
    } finally {
      await queryRunner.rollbackTransaction();
    }
  }

  async findOneByNickname(nickname: string): Promise<USERS> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      return await queryRunner.manager.findOne(USERS, {
        user_nickname: nickname,
      });
    } catch (err) {
      return err;
    } finally {
      await queryRunner.rollbackTransaction();
    }
  }

  async createOne(item: USERS): Promise<object> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('READ COMMITTED');
    const hash = await bcrypt.hash(item.user_password, 10);

    try {
      await queryRunner.query(`INSERT INTO [dbo].[USERS]
      ([USER_ID]
      ,[USER_NAME]
      ,[USER_BIO]
      ,[USER_PASSWORD]
      ,[USER_NICKNAME])
  VALUES
      (DEFAULT
      ,'${item.user_name}'
      ,'${item.user_bio}'
      ,'${hash}'
      ,'${item.user_nickname}')`);
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
