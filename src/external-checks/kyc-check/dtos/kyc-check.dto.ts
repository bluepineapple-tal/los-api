import { IsDateString, IsNotEmpty, IsString, Matches } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

const AADHAAR_REGEX = /^[2-9]\d{11}$/;
const PAN_REGEX = /^[A-Z]{5}\d{4}[A-Z]$/;

@InputType()
export class KycCheckInput {
  @Field() @IsString() @IsNotEmpty() first_name: string;
  @Field() @IsString() @IsNotEmpty() last_name: string;
  @Field() @IsString() @IsNotEmpty() address: string;

  @Field() @IsDateString() dob: string;

  @Field()
  @Matches(AADHAAR_REGEX, { message: 'Aadhaar must be 12 digits, start 2-9' })
  aadhaar_number: string;

  @Field()
  @Matches(PAN_REGEX, { message: 'PAN must be AAAAA9999A (upper-case)' })
  PAN: string;

  @Field() @IsString() aadhar_document: string;

  @Field() @IsString() pan_document: string;
}
