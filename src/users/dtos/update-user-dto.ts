import { IsEmail, IsOptional } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

import { UserRole } from '../user.entity';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  password?: string;

  @Field({ nullable: true })
  @IsOptional()
  role?: UserRole;

  // If vendor
  @Field({ nullable: true })
  @IsOptional()
  business_name?: string;

  @Field({ nullable: true })
  @IsOptional()
  address?: string;

  @Field({ nullable: true })
  @IsOptional()
  phone?: string;

  // If consumer
  @Field({ nullable: true })
  @IsOptional()
  first_name?: string;

  @Field({ nullable: true })
  @IsOptional()
  last_name?: string;
}

// For REST usage, we can have a plain DTO class with the same fields:

export class UpdateUserDto extends UpdateUserInput {}
