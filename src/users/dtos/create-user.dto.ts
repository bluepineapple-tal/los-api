import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

import { UserRole } from '../user.entity';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  password: string;

  @Field(() => String, { defaultValue: UserRole.CONSUMER })
  role: UserRole;

  // If the user is a VENDOR, we capture vendor fields
  @Field({ nullable: true })
  @IsOptional()
  business_name?: string;

  @Field({ nullable: true })
  @IsOptional()
  address?: string;

  @Field({ nullable: true })
  @IsOptional()
  phone?: string;

  // If the user is a CONSUMER, we capture consumer fields
  @Field({ nullable: true })
  @IsOptional()
  first_name?: string;

  @Field({ nullable: true })
  @IsOptional()
  last_name?: string;
}

// For REST usage, we can have a plain DTO class with the same fields:

export class CreateUserDto extends CreateUserInput {}
