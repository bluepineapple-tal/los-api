import { AmlCheckResponse } from 'src/external-checks/aml-check/dtos/aml-check.response';
import { CreditCheckResponse } from 'src/external-checks/credit-check/dtos/credit-check.response';
import { KycCheckResponse } from 'src/external-checks/kyc-check/dtos/kyc-check.response';

import { ApplicationStatus } from '../loan-application.entity';

/** Bundle the three third-party responses the engine needs */
export interface Checks {
  kyc: KycCheckResponse;
  aml: AmlCheckResponse;
  credit: CreditCheckResponse;
}

/** What a compute() call must return */
export interface DecisionOutcome {
  /** Final status to persist on `loan_application.status` */
  finalStatus: ApplicationStatus;
  /** Optional human-readable note stored in history */
  note?: string;
}
