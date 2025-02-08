import { IsEnum, IsOptional, IsUUID } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

import { ReviewStatus } from '../manual-review.entity';

@InputType()
export class CreateManualReviewInput {
  @Field()
  @IsUUID()
  loanApplicationId: string;

  @Field({ nullable: true })
  @IsUUID()
  @IsOptional()
  underwriterId?: string;

  @Field(() => ReviewStatus, { defaultValue: ReviewStatus.PENDING })
  @IsEnum(ReviewStatus)
  review_status?: ReviewStatus;

  @Field({ nullable: true })
  @IsOptional()
  notes?: string;
}

export class CreateManualReviewDto extends CreateManualReviewInput {}
