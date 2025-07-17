import { IsNotEmpty, IsOptional } from 'class-validator';

import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Country, Gender, MaritalStatus } from '../user.enums';
import { UserDTO } from './user.dto';

@ObjectType()
export class ConsumerDTO {
  @Field(() => ID) id: string;

  /* lifted core fields are already on UserDTO */
  @Field({ nullable: true }) date_of_birth?: Date;
  @Field(() => Gender, { nullable: true }) gender?: Gender;
  @Field(() => MaritalStatus, { nullable: true })
  marital_status?: MaritalStatus;
  @Field({ nullable: true }) alt_phone?: string;

  @Field() @IsNotEmpty() street1: string;
  @Field({ nullable: true }) @IsOptional() street2?: string;
  @Field() @IsNotEmpty() city: string;
  @Field() @IsNotEmpty() state: string;
  @Field() @IsNotEmpty() pin_code: string;
  @Field() country: string;

  @Field({ nullable: true }) aadhar_number?: string;
  @Field({ nullable: true }) pan_number?: string;

  @Field(() => UserDTO, { nullable: true })
  user?: UserDTO;
}
