import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users_db')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }
}
