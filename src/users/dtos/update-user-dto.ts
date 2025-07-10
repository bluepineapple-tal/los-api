import { IsEmail, IsEnum, IsOptional } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

import { Gender, MaritalStatus, UserRole } from '../user.enums';
import { AddressDTO } from './address.dto';

@InputType()
export class UpdateUserInput {
  /* base user ------------------------------------------------------- */
  @Field({ nullable: true }) @IsOptional() @IsEmail() email?: string;
  @Field({ nullable: true }) @IsOptional() password?: string;
  @Field({ nullable: true }) @IsOptional() first_name?: string;
  @Field({ nullable: true }) @IsOptional() last_name?: string;
  @Field({ nullable: true }) @IsOptional() phone?: string;
  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  /* vendor-specific ------------------------------------------------- */
  @Field({ nullable: true }) @IsOptional() business_name?: string;
  @Field({ nullable: true }) @IsOptional() address?: string;
  @Field({ nullable: true }) @IsOptional() business_phone?: string;

  /* consumer-specific ---------------------------------------------- */
  @Field({ nullable: true }) @IsOptional() date_of_birth?: Date;
  @Field({ nullable: true }) @IsOptional() @IsEnum(Gender) gender?: Gender;
  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(MaritalStatus)
  marital_status?: MaritalStatus;
  @Field({ nullable: true }) @IsOptional() alt_phone?: string;

  @Field(() => AddressDTO, { nullable: true })
  @IsOptional()
  address_obj?: AddressDTO;

  @Field({ nullable: true }) @IsOptional() aadhar_number?: string;
  @Field({ nullable: true }) @IsOptional() pan_number?: string;
}

export class UpdateUserDto extends UpdateUserInput {}
