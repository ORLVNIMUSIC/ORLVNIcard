import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SUGGESTION, SUGGESTIONDocument } from './suggestion.schema';

@Injectable()
export class SuggestionService {
  constructor(
    @InjectModel(SUGGESTION.name)
    private SUGGESTIONModel: Model<SUGGESTIONDocument>,
  ) {}

  async findAll(): Promise<SUGGESTION[]> {
    console.log(await this.SUGGESTIONModel.find().lean().exec());

    return await this.SUGGESTIONModel.find().lean().exec();
  }

  async createOne(item: SUGGESTION): Promise<object> {
    //   const queryRunner = this.connection.createQueryRunner();
    //   await queryRunner.connect();
    //   await queryRunner.startTransaction('READ COMMITTED');
    //   try {
    //     await queryRunner.query(`INSERT INTO [dbo].[SUGGESTIONS]
    //     ([SUG_ID]
    //     ,[USER_ID]
    //     ,[SUG_TEXT]
    //     ,[SUG_DATE])
    // VALUES
    //     (DEFAULT
    //     ,'${item.user_id}'
    //     ,'${item.sug_text}'
    //     ,DEFAULT)`);
    //     await queryRunner.commitTransaction();
    //     return { message: 'success' };
    //   } catch (err) {
    //     await queryRunner.rollbackTransaction();
    //     return { message: 'denied' };
    //   } finally {
    //     await queryRunner.release();
    //   }

    return await this.SUGGESTIONModel.create(item);
  }
}
