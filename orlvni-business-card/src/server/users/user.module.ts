import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { USER, USERSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: USER.name, schema: USERSchema }]),
  ],
  exports: [MongooseModule, UserService],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
