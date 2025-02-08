import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUnderwritingRuleInput {
  @Field()
  @IsNotEmpty()
  rule_name: string;

  @Field()
  @IsNotEmpty()
  rule_desc: string;

  @Field()
  @IsNotEmpty()
  conditions: string; // DSL or JSON

  @Field()
  @IsNotEmpty()
  action: string;

  @Field()
  priority: number;

  @Field({ defaultValue: true })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}

export class CreateUnderwritingRuleDto extends CreateUnderwritingRuleInput {}
