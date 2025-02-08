import { IsEnum, IsOptional, IsUUID } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

import { Decision } from '../underwriting-result.entity';

@InputType()
export class UpdateUnderwritingResultInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  ruleId?: string;

  @Field(() => Decision, { nullable: true })
  @IsEnum(Decision)
  @IsOptional()
  decision?: Decision;

  @Field({ nullable: true })
  @IsOptional()
  reason?: string;
}

export class UpdateUnderwritingResultDto extends UpdateUnderwritingResultInput {}
