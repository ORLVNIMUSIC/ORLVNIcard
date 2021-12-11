import { BadRequestException, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { USERS } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private connection: Connection) {}

  async findAll(): Promise<USERS[]> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      return await queryRunner.manager.find(USERS);
    } catch (err) {
      return err;
    } finally {
      await queryRunner.rollbackTransaction();
    }
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

  async findOneByEmail(email: string): Promise<USERS> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      return await queryRunner.manager.findOne(USERS, { user_email: email });
    } catch (err) {
      return err;
    } finally {
      await queryRunner.rollbackTransaction();
    }
  }

  async createOne(item: USERS): Promise<void> {
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
      ,[USER_EMAIL])
  VALUES
      (DEFAULT
      ,'${item.user_name}'
      ,'${item.user_bio}'
      ,'${hash}'
      ,'${item.user_email}')`);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
