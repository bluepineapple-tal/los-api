import { Field, Int, ObjectType } from '@nestjs/graphql';

import {
  Status,
  RiskCategory,
  ActionRequired,
  SanctionListMatch,
} from '../aml-check.enums';

@ObjectType()
export class AmlCheckResponse {
  @Field(() => Status)
  status: Status;

  @Field(() => Int)
  risk_score: number;

  @Field()
  match_found: boolean;

  @Field(() => null)
  match_details: null;

  @Field(() => SanctionListMatch)
  sanctions_list_match: SanctionListMatch;

  // Account metrics
  @Field()
  pep_status: boolean;

  @Field()
  adverse_media: boolean;

  @Field(() => Int)
  watchlist_match_score: number;

  @Field(() => RiskCategory)
  risk_category: RiskCategory;

  // Flags
  @Field(() => ActionRequired)
  action_required: ActionRequired;

  @Field()
  fraud_alert: boolean;

  // meta
  @Field()
  request_id: string;

  @Field()
  timestamp: string;
}
