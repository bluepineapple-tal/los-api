import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  Length,
  Min,
} from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

import { Gender, MaritalStatus, SourceOfIncome, UserRole } from '../user.enums';

/**
 * Single payload for:
 *  • SuperTokens ID link
 *  • Core profile (name, phone, etc.)
 *  • OPTIONAL vendor block
 *  • OPTIONAL consumer block (full KYC)
 *
 *  — Frontend onboarding will POST this to /users.
 */
@InputType()
export class CreateUserInput {
  /* identities ---------------------------------------------------- */
  @Field() @IsUUID() supertokensUserId: string;

  /* auth ---------------------------------------------------------- */
  @Field() @IsEmail() email: string;
  @Field({ nullable: true }) @IsOptional() password?: string;

  /* core profile -------------------------------------------------- */
  @Field() @IsNotEmpty() first_name: string;
  @Field() @IsNotEmpty() last_name: string;
  @Field({ nullable: true }) @IsOptional() phone?: string;

  /* role ---------------------------------------------------------- */
  @Field(() => String, { defaultValue: UserRole.CONSUMER })
  role: UserRole = UserRole.CONSUMER;

  /* ---------- VENDOR block (only if role === VENDOR) ------------- */
  @Field({ nullable: true }) @IsOptional() business_name?: string;
  @Field({ nullable: true }) @IsOptional() address?: string; // HQ address
  @Field({ nullable: true }) @IsOptional() business_phone?: string;

  /* ---------- CONSUMER KYC block (only if role === CONSUMER) ----- */
  /* identity */
  @Field({ nullable: true }) @IsOptional() date_of_birth?: Date;
  @Field(() => Gender, { nullable: true })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;
  @Field(() => MaritalStatus, { nullable: true })
  @IsOptional()
  @IsEnum(MaritalStatus)
  marital_status?: MaritalStatus;

  /* contact extras */
  @Field({ nullable: true }) @IsOptional() alt_phone?: string;

  /* address */
  @Field({ nullable: true }) @IsOptional() country?: string;
  @Field({ nullable: true }) @IsOptional() street1?: string;
  @Field({ nullable: true }) @IsOptional() street2?: string;
  @Field({ nullable: true }) @IsOptional() city?: string;
  @Field({ nullable: true }) @IsOptional() state?: string;
  @Field({ nullable: true }) @IsOptional() pin_code?: string;

  /* income */
  @Field({ nullable: true })
  @IsOptional()
  @Min(0)
  monthly_income?: number;
  @Field(() => SourceOfIncome, { nullable: true })
  @IsOptional()
  @IsEnum(SourceOfIncome)
  source_of_income?: SourceOfIncome;

  /* IDs + uploads ------------------------------------------------- */
  @Field({ nullable: true })
  @IsOptional()
  @Length(12, 12)
  aadhar_number?: string;
  // @Field({ nullable: true }) @IsOptional() aadhar_file?: File; // GraphQL Upload

  @Field({ nullable: true })
  @IsOptional()
  @Length(10, 10)
  pan_number?: string;
  // @Field({ nullable: true }) @IsOptional() pan_file?: File; // GraphQL Upload
}

/* REST controller can re-use the same class */
export class CreateUserDto extends CreateUserInput {}
