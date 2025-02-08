import { IsEnum, IsOptional, IsUUID } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

import { ReviewStatus } from '../manual-review.entity';

@InputType()
export class UpdateManualReviewInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  underwriterId?: string;

  @Field(() => ReviewStatus, { nullable: true })
  @IsEnum(ReviewStatus)
  @IsOptional()
  review_status?: ReviewStatus;

  @Field({ nullable: true })
  @IsOptional()
  notes?: string;
}

export class UpdateManualReviewDto extends UpdateManualReviewInput {}
