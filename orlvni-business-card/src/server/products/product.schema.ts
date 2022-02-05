import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { Document } from 'mongoose';

export type PRODUCTDocument = PRODUCT & Document;

@Schema()
export class PRODUCT {
  @Prop({ unique: true, default: randomUUID().toUpperCase() })
  product_id: string;

  @Prop()
  product_name: string;

  @Prop()
  product_desc: string;

  @Prop()
  product_cost: number;

  @Prop()
  product_availability: boolean;

  @Prop()
  user_id: string;
}

export const PRODUCTSchema = SchemaFactory.createForClass(PRODUCT);
