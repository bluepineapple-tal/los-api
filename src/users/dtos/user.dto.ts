import { Field, ID, ObjectType } from '@nestjs/graphql';

import { ConsumerDTO } from './consumer.dto';
import { VendorDTO } from './vendor.dto';
import { LoanApplicationDTO } from 'src/loan-applications/dtos/loan-application.dto';
import { ManualReviewDTO } from 'src/underwriting/manual-reviews/dtos/manual-review.dto';
import { LoanApplicationHistoryDTO } from 'src/loan-applications/loan-application-history/dtos/loan-application-history.dto';
import { UserRole, UserStatus } from '../user.enums';

@ObjectType()
export class UserDTO {
  @Field(() => ID) id: string;
  @Field(() => ID) supertokensUserId: string;

  /* identities & core profile -------------------------------------- */
  @Field() email: string;
  @Field() first_name: string;
  @Field() last_name: string;
  @Field({ nullable: true }) phone?: string;

  /* role & status --------------------------------------------------- */
  @Field(() => UserRole) role: UserRole;
  @Field(() => UserStatus) status: UserStatus;

  /* timestamps ------------------------------------------------------ */
  @Field() created_at: Date;
  @Field() updated_at: Date;

  /* role-specific sub-objects -------------------------------------- */
  @Field(() => ConsumerDTO, { nullable: true })
  consumerProfile?: ConsumerDTO;

  @Field(() => VendorDTO, { nullable: true })
  vendorProfile?: VendorDTO;

  @Field(() => LoanApplicationDTO, { nullable: true })
  underwrittenApplications?: LoanApplicationDTO[];

  @Field(() => ManualReviewDTO, { nullable: true })
  manualReviews?: ManualReviewDTO[];

  @Field(() => LoanApplicationHistoryDTO, { nullable: true })
  applicationHistories?: LoanApplicationHistoryDTO[];
}
