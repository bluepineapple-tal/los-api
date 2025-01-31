import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Loan {
  @Field()
  id: number;

  @Field()
  amount: number;

  @Field()
  status: string;
}
