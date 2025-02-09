import { IsEnum, IsOptional } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

import { CheckStatus, CheckType } from '../external-check.entity';

@InputType()
export class UpdateExternalCheckInput {
  @Field(() => CheckType, { nullable: true })
  @IsEnum(CheckType)
  @IsOptional()
  check_type?: CheckType;

  @Field(() => CheckStatus, { nullable: true })
  @IsEnum(CheckStatus)
  @IsOptional()
  check_status?: CheckStatus;

  @Field({ nullable: true })
  @IsOptional()
  response_data?: string;

  @Field({ nullable: true })
  @IsOptional()
  responded_at?: string; // string for date in the GraphQL request
}

export class UpdateExternalCheckDto extends UpdateExternalCheckInput {}
