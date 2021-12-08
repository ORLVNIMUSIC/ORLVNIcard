import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { USERS } from './user.entity';

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
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      return err;
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  async findOne(id: string): Promise<USERS> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      return await queryRunner.manager.findOne(USERS, id);
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
