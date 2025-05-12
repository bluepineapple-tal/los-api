import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { AmlCheckInput } from './dtos/aml-check.dto';
import { AmlCheckResponse } from './dtos/aml-check.response';
import {
  Status,
  RiskCategory,
  ActionRequired,
  SanctionListMatch,
} from './aml-check.enums';

@Injectable()
export class AmlCheckService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  amlCheck(input: AmlCheckInput): AmlCheckResponse {
    const risk_score = this.getRandomInt(0, 20);
    const watchlist_match_score = this.getRandomInt(0, 10);

    return {
      status: Status.SUCCESS,
      risk_score,
      match_found: false,
      match_details: null,
      sanctions_list_match: SanctionListMatch.NONE,
      pep_status: false,
      adverse_media: false,
      watchlist_match_score,
      risk_category: RiskCategory.LOW,
      action_required: ActionRequired.APPROVE,
      fraud_alert: false,
      request_id: randomUUID(),
      timestamp: new Date().toISOString(),
    };
  }

  // Utility methods
  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
