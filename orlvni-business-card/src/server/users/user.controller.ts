import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateUserDTO } from './DTO/create.user.dto';
import { USERS } from './user.entity';
import { UserService } from './user.service';

@Controller('server/users')
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

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async saveOne(@Body() item: CreateUserDTO): Promise<void> {
    await this.userService.createOne(item);
  }
}
