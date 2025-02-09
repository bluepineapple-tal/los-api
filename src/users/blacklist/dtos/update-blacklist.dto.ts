import { IsOptional, IsUUID } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateBlacklistInput {
  @Field({ nullable: true })
  @IsOptional()
  pan?: string;

  @Field({ nullable: true })
  @IsUUID()
  @IsOptional()
  userId?: string;
}

export class UpdateBlacklistDto extends UpdateBlacklistInput {}
