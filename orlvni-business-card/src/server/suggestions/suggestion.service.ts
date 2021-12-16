import { BadRequestException, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { SUGGESTIONS } from './suggestion.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SuggestionService {
  constructor(private connection: Connection) {}

  async findAll(): Promise<SUGGESTIONS[]> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      return await queryRunner.manager.find(SUGGESTIONS);
    } catch (err) {
      return err;
    } finally {
      await queryRunner.rollbackTransaction();
    }
  }

  async createOne(item: SUGGESTIONS): Promise<object> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('READ COMMITTED');

    try {
      await queryRunner.query(`INSERT INTO [dbo].[SUGGESTIONS]
      ([SUG_ID]
      ,[USER_ID]
      ,[SUG_TEXT]
      ,[SUG_DATE])
  VALUES
      (DEFAULT
      ,'${item.user_id}'
      ,'${item.sug_text}'
      ,DEFAULT)`);
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
