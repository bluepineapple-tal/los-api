import {
  ActionRequired,
  Status as AmlStatus,
} from 'src/external-checks/aml-check/aml-check.enums';
import { KycStatus } from 'src/external-checks/kyc-check/kyc-check.enums';

import { Injectable } from '@nestjs/common';

import { ApplicationStatus } from '../loan-application.entity';
import { Checks, DecisionOutcome } from './decision.types';

@Injectable()
export class DecisionEngine {
  compute({ kyc, aml, credit }: Checks): DecisionOutcome {
    const reviewReasons: string[] = [];

    /* -------- KYC -------- */
    if (kyc.status !== KycStatus.SUCCESS) {
      reviewReasons.push('KYC failed/timeout');
    }

    /* -------- AML -------- */
    if (aml.action_required === ActionRequired.REJECT) {
      return { finalStatus: ApplicationStatus.REJECTED, note: 'AML-reject' };
    }
    if (
      aml.action_required === ActionRequired.REVIEW_REQUIRED ||
      aml.status !== AmlStatus.SUCCESS
    ) {
      reviewReasons.push('AML review/timeout');
    }

    /* ---- Credit score ---- */
    if (credit.credit_score > 670) {
      // nothing to add
    } else if (credit.credit_score < 580) {
      return {
        finalStatus: ApplicationStatus.REJECTED,
        note: 'Low credit score',
      };
    } else {
      reviewReasons.push('Borderline credit');
    }

    /* -------- Decide -------- */
    if (reviewReasons.length > 0) {
      return {
        finalStatus: ApplicationStatus.UNDER_REVIEW,
        note: reviewReasons.join(', '), // e.g. "KYC failed/timeout, AML review/timeout"
      };
    }

    return { finalStatus: ApplicationStatus.APPROVED };
  }
}
