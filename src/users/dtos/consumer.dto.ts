import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ConsumerDTO {
  @Field(() => ID)
  id: string;

  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field()
  phone: string;

  @Field({ nullable: true })
  dob?: Date;
}
