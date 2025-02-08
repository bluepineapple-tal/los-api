import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UnderwritingRuleDTO {
  @Field(() => ID)
  id: string;

  @Field()
  rule_name: string;

  @Field()
  rule_desc: string;

  @Field()
  conditions: string; // might store JSON or DSL

  @Field()
  action: string;

  @Field()
  priority: number;

  @Field()
  active: boolean;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}
