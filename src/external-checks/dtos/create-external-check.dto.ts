import { IsEnum, IsOptional, IsUUID } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

import { CheckStatus, CheckType } from '../external-check.entity';

@InputType()
export class CreateExternalCheckInput {
  @Field()
  @IsUUID()
  loanApplicationId: string;

  @Field(() => CheckType)
  @IsEnum(CheckType)
  check_type: CheckType;

  @Field(() => CheckStatus, { defaultValue: CheckStatus.PENDING })
  @IsEnum(CheckStatus)
  check_status?: CheckStatus = CheckStatus.PENDING;

  @Field({ nullable: true })
  @IsOptional()
  response_data?: string;
}

export class CreateExternalCheckDto extends CreateExternalCheckInput {}
