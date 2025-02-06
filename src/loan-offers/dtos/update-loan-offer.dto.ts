import { Field, Float, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsOptional, IsUUID } from 'class-validator';

@InputType()
export class UpdateLoanOfferInput {
  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  interest_rate?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  tenure_months?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  processing_fee?: number;

  @Field({ nullable: true })
  @IsOptional()
  offer_name?: string;

  @Field({ nullable: true })
  @IsOptional()
  offer_details?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  productId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  createdById?: string;
}

export class UpdateLoanOfferDto extends UpdateLoanOfferInput {}
