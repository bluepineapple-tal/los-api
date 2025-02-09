import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BlacklistDTO {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  pan?: string;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}
