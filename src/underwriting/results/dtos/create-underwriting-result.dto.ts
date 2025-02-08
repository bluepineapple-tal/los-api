import { IsEnum, IsOptional, IsUUID } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

import { Decision } from '../underwriting-result.entity';

@InputType()
export class CreateUnderwritingResultInput {
  @Field()
  @IsUUID()
  loanApplicationId: string;

  @Field()
  @IsUUID()
  ruleId: string;

  @Field(() => Decision)
  @IsEnum(Decision)
  decision: Decision;

  @Field({ nullable: true })
  @IsOptional()
  reason?: string;
}

export class CreateUnderwritingResultDto extends CreateUnderwritingResultInput {}
