import { Field, Float, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  Min,
} from 'class-validator';

@InputType()
export class CreateLoanOfferInput {
  /* pricing */
  @Field(() => Float) @IsNumber() interest_rate: number;
  @Field() @IsNumber() tenure_months: number;
  @Field(() => Float) @IsNumber() processing_fee: number;

  /* ranges */
  @Field(() => Float) @IsNumber() @Min(0) min_amount: number;
  @Field(() => Float) @IsNumber() @Min(0) max_amount: number;

  @Field() @IsDate() valid_from: Date;
  @Field() @IsDate() valid_to: Date;

  /* misc */
  @Field() @IsNotEmpty() offer_name: string;
  @Field({ nullable: true }) @IsOptional() offer_details?: string;
  @Field({ defaultValue: true }) @IsBoolean() is_active: boolean;

  /* optional legacy relations */
  @Field({ nullable: true }) @IsOptional() @IsUUID() createdById?: string;
}
export class CreateLoanOfferDto extends CreateLoanOfferInput {}
