import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { Document } from 'mongoose';

export type USERDocument = USER & Document;

@Schema({ versionKey: false })
export class USER {
  @Prop({ unique: true, default: randomUUID().toUpperCase() })
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
