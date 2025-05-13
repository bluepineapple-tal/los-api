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
  // PAN numbers
  private readonly PepPANList: string[] = [
    'PEPLS1234A',
    'PEPLS1234B', // Add as many as needed
  ];
  private readonly fraudAlertPANs: string[] = ['FRDAL1234A', 'FRDAL1234B'];

  private readonly mediumRiskWatchlistPANs: string[] = [
    'MEDRS1234A',
    'MEDRS1234B',
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  amlCheck(input: AmlCheckInput): AmlCheckResponse {
    const { PAN } = input;

    // SCENARIO 1: Sanction match with insider trading list
    if (this.PepPANList.includes(PAN)) {
      return {
        status: Status.SUCCESS,
        risk_score: this.getRandomInt(71, 99),
        match_found: true,
        match_details: null,
        sanctions_list_match: SanctionListMatch.SEBI_INSIDER_TRADING_WATCHLIST,
        pep_status: true,
        adverse_media: true,
        watchlist_match_score: this.getRandomInt(71, 99),
        risk_category: RiskCategory.HIGH,
        action_required: ActionRequired.REJECT,
        fraud_alert: false,
        request_id: randomUUID(),
        timestamp: new Date().toISOString(),
      };
    }

    // SCENARIO 02: High-risk with fraud flag but no match found
    if (this.fraudAlertPANs.includes(PAN)) {
      return {
        status: Status.SUCCESS,
        risk_score: this.getRandomInt(71, 99),
        match_found: false,
        match_details: null,
        sanctions_list_match: SanctionListMatch.NONE,
        pep_status: false,
        adverse_media: false,
        watchlist_match_score: this.getRandomInt(0, 20),
        risk_category: RiskCategory.HIGH,
        action_required: ActionRequired.REJECT,
        fraud_alert: true,
        request_id: randomUUID(),
        timestamp: new Date().toISOString(),
      };
    }
    // SCENARIO 3: Medium-risk with RBI Defaulters List
    if (this.mediumRiskWatchlistPANs.includes(PAN)) {
      return {
        status: Status.SUCCESS,
        risk_score: this.getRandomInt(41, 70),
        match_found: true,
        match_details: null,
        sanctions_list_match: SanctionListMatch.RBI_DEFAULTERS_LIST,
        pep_status: false,
        adverse_media: false,
        watchlist_match_score: this.getRandomInt(50, 71),
        risk_category: RiskCategory.MEDIUM,
        action_required: ActionRequired.REVIEW_REQUIRED,
        fraud_alert: false,
        request_id: randomUUID(),
        timestamp: new Date().toISOString(),
      };
    }
    // DEFAULT LOW RISK
    return {
      status: Status.SUCCESS,
      risk_score: this.getRandomInt(0, 20),
      match_found: false,
      match_details: null,
      sanctions_list_match: SanctionListMatch.NONE,
      pep_status: false,
      adverse_media: false,
      watchlist_match_score: this.getRandomInt(0, 10),
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
