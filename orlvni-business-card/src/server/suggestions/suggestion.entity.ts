@Entity()
export class SUGGESTIONS {
  @ObjectIdColumn()
  id: ObjectID;

  @PrimaryColumn()
  sug_id: string;

  @Column()
  user_id: string;

  @Column()
  sug_text: string;

  @Column()
  sug_date: string;
}
