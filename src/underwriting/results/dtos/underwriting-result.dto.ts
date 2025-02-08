import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

import { Decision } from '../underwriting-result.entity';

registerEnumType(Decision, { name: 'Decision' }); // TODO: Check for better enum values

@ObjectType()
export class UnderwritingResultDTO {
  @Field(() => ID)
  id: string;

  @Field(() => Decision)
  decision: Decision;

  @Field({ nullable: true })
  reason?: string;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;

  // [TBC] if we want to expose the rule or loanApp, add references
}
