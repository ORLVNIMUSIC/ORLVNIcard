import { Module } from '@nestjs/common';
import { SuggestionController } from './suggestion.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SUGGESTION, SUGGESTIONSchema } from './suggestion.schema';
import { SuggestionService } from './suggestion.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SUGGESTION.name, schema: SUGGESTIONSchema },
    ]),
  ],
  exports: [MongooseModule],
  providers: [SuggestionService],
  controllers: [SuggestionController],
})
export class SuggestionModule {}
