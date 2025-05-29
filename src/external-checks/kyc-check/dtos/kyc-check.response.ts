import { Field, ObjectType } from '@nestjs/graphql';

import { KycStatus, VerificationOutcome } from '../kyc-check.enums';

@ObjectType()
export class KycCheckResponse {
  @Field(() => KycStatus) status: KycStatus;
  @Field(() => VerificationOutcome) verification_status: VerificationOutcome;

  @Field() message: string;

  /** Additional context for PARTIAL / FAILED cases */
  @Field(() => [String], { nullable: true })
  fields_incorrect?: string[];

  @Field() request_id: string;
  @Field() timestamp: string;
}
