import { Module } from '@nestjs/common';
import { SuggestionController } from './suggestion.controller';
import { SUGGESTIONS } from './suggestion.entity';
import { SuggestionService } from './suggestion.service';

@Module({
  imports: [TypeOrmModule.forFeature([SUGGESTIONS])],
  exports: [TypeOrmModule],
  providers: [SuggestionService],
  controllers: [SuggestionController],
})
export class SuggestionModule {}
