import { Field, Float, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoanOfferDTO {
  @Field(() => ID) id: string;

  /* pricing */
  @Field(() => Float) interest_rate: number;
  @Field() tenure_months: number;
  @Field(() => Float) processing_fee: number;

  /* ranges */
  @Field(() => Float) min_amount: number;
  @Field(() => Float) max_amount: number;
  @Field() valid_from: Date;
  @Field() valid_to: Date;

  /* misc */
  @Field() offer_name: string;
  @Field({ nullable: true }) offer_details?: string;
  @Field() is_active: boolean;
  @Field() created_at: Date;
  @Field() updated_at: Date;
}
