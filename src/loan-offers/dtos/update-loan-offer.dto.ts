import { Field, Float, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsUUID,
  Min,
} from 'class-validator';

@InputType()
export class UpdateLoanOfferInput {
  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  interest_rate?: number;
  @Field({ nullable: true }) @IsOptional() @IsNumber() tenure_months?: number;
  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  processing_fee?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  min_amount?: number;
  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  max_amount?: number;

  @Field({ nullable: true }) @IsOptional() @IsDate() valid_from?: Date;
  @Field({ nullable: true }) @IsOptional() @IsDate() valid_to?: Date;

  @Field({ nullable: true }) @IsOptional() offer_name?: string;
  @Field({ nullable: true }) @IsOptional() offer_details?: string;
  @Field({ nullable: true }) @IsOptional() @IsBoolean() is_active?: boolean;

  @Field({ nullable: true }) @IsOptional() @IsUUID() productModelId?: string;
  @Field({ nullable: true }) @IsOptional() @IsUUID() createdById?: string;
}
export class UpdateLoanOfferDto extends UpdateLoanOfferInput {}
