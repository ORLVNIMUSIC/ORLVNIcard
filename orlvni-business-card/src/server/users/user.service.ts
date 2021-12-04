import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { USERS } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(USERS)
    private usersRepository: Repository<USERS>,
  ) {}

  findAll(): Promise<USERS[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<USERS> {
    return this.usersRepository.findOne(id);
  }
}
