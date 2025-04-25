import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Min,
} from 'class-validator';

import { Field, InputType, Int } from '@nestjs/graphql';

import { Gender, MaritalStatus, NatureOfBusiness } from '../credit-check.enums';

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const AADHAAR_REGEX = /^[2-9]{1}[0-9]{11}$/;
const PHONE_REGEX = /^[0-9]{10}$/;
const PIN_REGEX = /^[0-9]{6}$/;

@InputType()
export class CreditCheckInput {
  // Mandatory fields
  @Field()
  @IsString()
  @IsNotEmpty()
  customer_name: string;

  @Field(() => Gender)
  @IsEnum(Gender)
  gender: Gender;

  @Field()
  @Matches(PAN_REGEX, {
    message:
      'PAN must be 10 characters (AAAAA9999A) with uppercase letters and digits',
  })
  PAN: string;

  @Field()
  @Matches(AADHAAR_REGEX, {
    message: 'Aadhaar must be 12 digits starting with 2-9',
  })
  aadhaar_number: string;

  @Field(() => Int)
  @IsInt()
  @Min(0)
  monthly_income: number;

  @Field(() => MaritalStatus)
  @IsEnum(MaritalStatus)
  marital_status: MaritalStatus;

  @Field(() => NatureOfBusiness)
  @IsEnum(NatureOfBusiness)
  natureOfBusiness: NatureOfBusiness;

  @Field() // ISO-8601 date string
  @IsDateString()
  dob: string;

  @Field()
  @Matches(PHONE_REGEX, { message: 'Phone number must be 10 digits' })
  phone_number: string;

  @Field()
  @IsEmail()
  email_id: string;

  @Field()
  @IsString()
  address: string;

  @Field()
  @Matches(PIN_REGEX, { message: 'Postcode must be 6 digits' })
  postcode: string;

  // Optional extras (kept for future use)
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  nature_of_residence?: string;
}
