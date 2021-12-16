import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class SUGGESTIONS {
  @PrimaryColumn()
  sug_id: string;

  @Column()
  user_id: string;

  @Column()
  sug_text: string;

  @Column()
  sug_date: string;
}
