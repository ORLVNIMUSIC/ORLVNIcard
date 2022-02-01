import { ObjectID } from 'typeorm';

export class CreateSuggestionDTO {
  readonly id: ObjectID;
  readonly sug_id: string;
  readonly user_id: string;
  readonly sug_text: string;
  readonly sug_date: string;
}
