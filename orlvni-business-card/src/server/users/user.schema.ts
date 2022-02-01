import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type USERDocument = USER & Document;

@Schema()
export class USER {
  @Prop({ unique: true })
  _id: string;

  @Prop({ unique: true })
  user_id: string;

  @Prop()
  user_name: string;

  @Prop()
  user_bio: string;

  @Prop()
  user_password: string;

  @Prop({ unique: true })
  user_nickname: string;
}

export const USERSchema = SchemaFactory.createForClass(USER);
