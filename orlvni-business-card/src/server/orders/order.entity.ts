import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class ORDERS {
  @PrimaryColumn()
  order_id: string;

  @Column()
  product_id: string;

  @Column()
  user_id: string;
}
