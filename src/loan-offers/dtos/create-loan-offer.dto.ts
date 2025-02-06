import { Field, Float, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';

@InputType()
export class CreateLoanOfferInput {
  @Field(() => Float)
  @IsNumber()
  interest_rate: number;

  @Field()
  @IsNumber()
  tenure_months: number;

  @Field(() => Float)
  @IsNumber()
  processing_fee: number;

  @Field()
  @IsNotEmpty()
  offer_name: string;

  @Field({ nullable: true })
  @IsOptional()
  offer_details?: string;

  @Field({ defaultValue: true })
  @IsBoolean()
  is_active: boolean;

  // We reference existing Product & User
  @Field()
  @IsUUID()
  productId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  createdById?: string; // The user who created it
}

export class CreateLoanOfferDto extends CreateLoanOfferInput {}
