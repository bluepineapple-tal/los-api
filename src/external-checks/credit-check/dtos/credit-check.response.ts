import { Field, Int, ObjectType } from '@nestjs/graphql';

import { ScoreBand, ScoreProvider } from '../credit-check.enums';

@ObjectType()
export class CreditCheckResponse {
  @Field(() => Int)
  credit_score: number;

  @Field(() => ScoreProvider)
  score_provider: ScoreProvider;

  @Field(() => Int)
  score_range_min: number;

  @Field(() => Int)
  score_range_max: number;

  @Field(() => ScoreBand)
  score_band: ScoreBand;

  // Account metrics
  @Field(() => Int)
  total_accounts: number;

  @Field(() => Int)
  active_accounts: number;

  @Field(() => Int)
  closed_accounts: number;

  @Field(() => Int)
  credit_card_accounts: number;

  // Flags
  @Field()
  default_flag: boolean;

  @Field()
  npa_status: boolean;

  // meta
  @Field()
  request_id: string;

  @Field()
  timestamp: string;
}
