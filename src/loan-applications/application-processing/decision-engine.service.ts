import {
  ActionRequired,
  Status,
} from 'src/external-checks/aml-check/aml-check.enums';
import { KycStatus } from 'src/external-checks/kyc-check/kyc-check.enums';

import { Injectable } from '@nestjs/common';

import { ApplicationStatus } from '../loan-application.entity';
import { Checks, DecisionOutcome } from './decision.types';

@Injectable()
export class DecisionEngine {
  compute({ kyc, aml, credit }: Checks): DecisionOutcome {
    /* -------- KYC -------- */
    if (kyc.status !== KycStatus.SUCCESS) {
      return {
        finalStatus: ApplicationStatus.UNDER_REVIEW,
        note: 'KYC failed/timeout',
      };
    }

    /* -------- AML -------- */
    if (aml.action_required === ActionRequired.REJECT) {
      return { finalStatus: ApplicationStatus.REJECTED, note: 'AML-reject' };
    }
    if (
      aml.action_required === ActionRequired.REVIEW_REQUIRED ||
      aml.status !== Status.SUCCESS
    ) {
      return {
        finalStatus: ApplicationStatus.UNDER_REVIEW,
        note: 'AML review/timeout',
      };
    }

    /* ---- Credit score ---- */
    if (credit.credit_score > 670) {
      return { finalStatus: ApplicationStatus.APPROVED };
    }
    if (credit.credit_score < 580) {
      return {
        finalStatus: ApplicationStatus.REJECTED,
        note: 'Low credit score',
      };
    }
    // 580-670 **or** credit service failure
    return {
      finalStatus: ApplicationStatus.UNDER_REVIEW,
      note: 'Borderline credit',
    };
  }
}
