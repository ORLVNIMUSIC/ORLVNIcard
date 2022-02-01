import {
  Entity,
  Column,
  PrimaryColumn,
  ObjectIdColumn,
  ObjectID,
} from 'typeorm';

@Entity()
export class PRODUCTS {
  @ObjectIdColumn()
  id: ObjectID;

  @PrimaryColumn()
  product_id: string;

  @Column()
  product_name: string;

  @Column()
  product_desc: string;

  @Column()
  product_cost: number;

  @Column()
  product_availability: boolean;

  @Column()
  user_id: string;
}
