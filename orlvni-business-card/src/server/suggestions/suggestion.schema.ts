import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { Document } from 'mongoose';

export type SUGGESTIONDocument = SUGGESTION & Document;

@Schema({ versionKey: false })
export class SUGGESTION {
  @Prop({ unique: true, default: randomUUID().toUpperCase() })
  sug_id: string;

  @Prop()
  user_id: string;

  @Prop()
  sug_text: string;

  @Prop()
  sug_date: string;
}

export const SUGGESTIONSchema = SchemaFactory.createForClass(SUGGESTION);
