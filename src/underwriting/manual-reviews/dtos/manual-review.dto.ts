import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

import { ReviewStatus } from '../manual-review.entity';

registerEnumType(ReviewStatus, { name: 'ReviewStatus' });

@ObjectType()
export class ManualReviewDTO {
  @Field(() => ID)
  id: string;

  @Field(() => ReviewStatus)
  review_status: ReviewStatus;

  @Field({ nullable: true })
  notes?: string;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}
