import { IsEmail, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

import { UserRole } from '../user.enums';

@InputType()
export class CreateUserInput {
  /* identities ------------------------------------------------------ */
  @Field() @IsUUID() supertokensUserId: string;

  /* auth ------------------------------------------------------------ */
  @Field() @IsEmail() email: string;
  @Field({ nullable: true }) @IsOptional() password?: string;

  /* core profile ---------------------------------------------------- */
  @Field() @IsNotEmpty() first_name: string;
  @Field() @IsNotEmpty() last_name: string;
  @Field({ nullable: true }) @IsOptional() phone?: string;

  /* role ------------------------------------------------------------ */
  @Field(() => String, { defaultValue: UserRole.CONSUMER })
  role: UserRole = UserRole.CONSUMER;

  /* vendor-only ----------------------------------------------------- */
  @Field({ nullable: true }) @IsOptional() business_name?: string;
  @Field({ nullable: true }) @IsOptional() address?: string; // vendor HQ
  @Field({ nullable: true }) @IsOptional() business_phone?: string;

  /* consumer-only (optional on sign-up) ----------------------------- */
  // These can be filled later in the onboarding form

  // TODO: User details will be captured after signup on the /onboarding page,
  // make sure if consumer or vendor role completes this profile after logging in.

  // User log in -> complete onboarding -> create loan application ->
}

export class CreateUserDto extends CreateUserInput {}
