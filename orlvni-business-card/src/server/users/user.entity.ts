import { Entity, Column, PrimaryColumn } from 'typeorm';

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
