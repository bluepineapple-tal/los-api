import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Gender, MaritalStatus, SourceOfIncome } from '../user.enums';
import { AddressDTO } from './address.dto';

@ObjectType()
export class ConsumerDTO {
  @Field(() => ID) id: string;

  /* lifted core fields are already on UserDTO */
  @Field({ nullable: true }) date_of_birth?: Date;
  @Field(() => Gender, { nullable: true }) gender?: Gender;
  @Field(() => MaritalStatus, { nullable: true })
  marital_status?: MaritalStatus;
  @Field({ nullable: true }) alt_phone?: string;

  @Field(() => AddressDTO, { nullable: true }) address?: AddressDTO;
  @Field({ nullable: true }) monthly_income?: number;
  @Field(() => SourceOfIncome, { nullable: true })
  source_of_income?: SourceOfIncome;
  @Field({ nullable: true }) aadhar_number?: string;
  @Field({ nullable: true }) pan_number?: string;
}
