import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateSuggestionDTO } from './DTO/create.suggestion.dto';
import { SuggestionService } from './suggestion.service';

@Controller('server/suggest')
export class SuggestionController {
  constructor(private readonly suggestionService: SuggestionService) {}

  @Get()
  async getAll() {
    return await this.suggestionService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async saveOne(@Body() item: CreateSuggestionDTO): Promise<object> {
    return await this.suggestionService.createOne(item);
  }
}
