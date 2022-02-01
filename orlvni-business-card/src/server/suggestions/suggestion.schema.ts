import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SUGGESTIONDocument = SUGGESTION & Document;

@Schema()
export class SUGGESTION {
  @Prop()
  sug_id: string;

  @Prop()
  user_id: string;

  @Prop()
  sug_text: string;

  @Prop()
  sug_date: string;
}

export const SUGGESTIONSchema = SchemaFactory.createForClass(SUGGESTION);
