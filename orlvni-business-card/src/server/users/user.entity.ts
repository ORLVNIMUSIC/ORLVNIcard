import {
  Entity,
  Column,
  PrimaryColumn,
  ObjectIdColumn,
  ObjectID,
} from 'typeorm';

@Entity()
export class USERS {
  @ObjectIdColumn()
  _id: ObjectID;

  @PrimaryColumn()
  user_id: string;

  @Column()
  user_name: string;

  @Column()
  user_bio: string;

  @Column()
  user_password: string;

  @Column()
  user_nickname: string;
}
