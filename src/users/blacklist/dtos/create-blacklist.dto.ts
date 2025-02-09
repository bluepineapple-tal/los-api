import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBlacklistInput {
  @Field()
  @IsNotEmpty()
  pan: string; // The unique PAN used for blacklisting

  @Field({ nullable: true })
  @IsUUID()
  @IsOptional()
  userId?: string; // If you also want to link it to a user
}

export class CreateBlacklistDto extends CreateBlacklistInput {}
