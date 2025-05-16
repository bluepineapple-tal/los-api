import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsEmail,
  Matches,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const AADHAAR_REGEX = /^[2-9]{1}[0-9]{11}$/;
const PHONE_REGEX = /^[0-9]{10}$/;
const PIN_REGEX = /^[0-9]{6}$/;

@InputType()
export class AmlCheckInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  customer_name: string;

  @Field()
  @IsDateString()
  dob: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  nationality: string;

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

  @Field()
  @Matches(PHONE_REGEX, { message: 'Phone number must be 10 digits' })
  phone_number: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field()
  @Matches(PIN_REGEX, { message: 'Postcode must be 6 digits' })
  postcode: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  currency: string; // Example: 'INR'
}
