import { ObjectID } from 'typeorm';

export class CreateOrderDTO {
  readonly id: ObjectID;
  readonly order_id: string;
  readonly product_id: string;
  readonly user_id: string;
}
