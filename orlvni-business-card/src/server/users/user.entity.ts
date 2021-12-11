import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { PRODUCTS } from '../products/product.entity';

@Entity()
export class USERS {
  @PrimaryColumn()
  user_id: string;

  @Column()
  user_name: string;

  @Column()
  user_bio: string;

  @Column()
  user_password: string;

  @Column()
  user_email: string;
}
