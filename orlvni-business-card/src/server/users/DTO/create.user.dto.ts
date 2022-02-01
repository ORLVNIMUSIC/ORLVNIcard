import { ObjectID } from 'typeorm';

export class CreateUserDTO {
  readonly _id: ObjectID;
  readonly user_id: string;
  readonly user_name: string;
  readonly user_bio: string;
  readonly user_password: string;
  readonly user_nickname: string;
}
