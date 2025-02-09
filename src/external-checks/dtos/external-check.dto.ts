import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

import { CheckStatus, CheckType } from '../external-check.entity';

registerEnumType(CheckType, { name: 'CheckType' });
registerEnumType(CheckStatus, { name: 'CheckStatus' });

@ObjectType()
export class ExternalCheckDTO {
  @Field(() => ID)
  id: string;

  @Field(() => CheckType)
  check_type: CheckType;

  @Field(() => CheckStatus)
  check_status: CheckStatus;

  @Field({ nullable: true })
  response_data?: string;

  @Field()
  requested_at: Date;

  @Field({ nullable: true })
  responded_at?: Date;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}
