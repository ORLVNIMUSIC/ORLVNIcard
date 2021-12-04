import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { USERS } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([USERS])],
  exports: [TypeOrmModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
