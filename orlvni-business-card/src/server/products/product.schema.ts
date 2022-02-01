import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PRODUCTDocument = PRODUCT & Document;

@Schema()
export class PRODUCT {
  @Prop()
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
