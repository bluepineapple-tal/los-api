import { IsBoolean, IsOptional } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUnderwritingRuleInput {
  @Field({ nullable: true })
  @IsOptional()
  rule_name?: string;

  @Field({ nullable: true })
  @IsOptional()
  rule_desc?: string;

  @Field({ nullable: true })
  @IsOptional()
  conditions?: string;

  @Field({ nullable: true })
  @IsOptional()
  action?: string;

  @Field({ nullable: true })
  @IsOptional()
  priority?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}

export class UpdateUnderwritingRuleDto extends UpdateUnderwritingRuleInput {}
