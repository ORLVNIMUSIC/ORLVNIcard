import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { Document } from 'mongoose';

export type ORDERDocument = ORDER & Document;

@Schema()
export class ORDER {
  @Prop({ unique: true, default: randomUUID().toUpperCase() })
  order_id: string;

  @Prop()
  product_id: string;

  @Prop()
  user_id: string;
}

export const ORDERSchema = SchemaFactory.createForClass(ORDER);
