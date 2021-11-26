import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PRODUCTS {
  @PrimaryGeneratedColumn()
  product_id: string;

  @Column()
  product_name: string;

  @Column()
  product_desc: string;
}
