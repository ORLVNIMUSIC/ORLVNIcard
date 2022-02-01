import {
  Entity,
  Column,
  PrimaryColumn,
  ObjectIdColumn,
  ObjectID,
} from 'typeorm';

@Entity()
export class ORDERS {
  @ObjectIdColumn()
  id: ObjectID;

  @PrimaryColumn()
  order_id: string;

  @Column()
  product_id: string;

  @Column()
  user_id: string;
}
