import { IsNotEmpty, IsOptional } from 'class-validator';

import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { Country } from '../user.enums';

@InputType('AddressInput')
@ObjectType('AddressDTO')
export class AddressDTO {
  @Field() @IsNotEmpty() street1: string;
  @Field({ nullable: true }) @IsOptional() street2?: string;
  @Field() @IsNotEmpty() city: string;
  @Field() @IsNotEmpty() state: string;
  @Field() @IsNotEmpty() pin_code: string;
  @Field(() => Country) country: Country;
}
