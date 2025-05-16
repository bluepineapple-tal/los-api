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
  private readonly pepPANs = new Set(['PEPLS1234A', 'PEPLS1234B']);
  private readonly fraudPANs = new Set(['FRDAL1234A', 'FRDAL1234B']);
  private readonly mediumRiskPANs = new Set(['MEDRS1234A', 'MEDRS1234B']);

  amlCheck(input: AmlCheckInput): AmlCheckResponse {
    const { PAN, customer_name } = input;
    const rules: [() => boolean, () => Partial<AmlCheckResponse>][] = [
      [
        () => this.pepPANs.has(PAN),
        () => ({
          customer_name: customer_name,
          status: Status.SUCCESS,
          risk_score: this.getRandomInt([71, 99]),
          match_found: true,
          match_details: null,
          sanctions_list_match:
            SanctionListMatch.SEBI_INSIDER_TRADING_WATCHLIST,
          pep_status: true,
          adverse_media: true,
          watchlist_match_score: this.getRandomInt([71, 99]),
          risk_category: RiskCategory.HIGH,
          action_required: ActionRequired.REJECT,
          fraud_alert: false,
          request_id: randomUUID(),
          timestamp: new Date().toISOString(),
        }),
      ],
      [
        () => this.fraudPANs.has(PAN),
        () => ({
          customer_name: customer_name,
          status: Status.SUCCESS,
          risk_score: this.getRandomInt([71, 99]),
          match_found: false,
          match_details: 'XXX',
          sanctions_list_match: SanctionListMatch.NONE,
          pep_status: false,
          adverse_media: false,
          watchlist_match_score: this.getRandomInt([0, 20]),
          risk_category: RiskCategory.HIGH,
          action_required: ActionRequired.REJECT,
          fraud_alert: true,
          request_id: randomUUID(),
          timestamp: new Date().toISOString(),
        }),
      ],
      [
        () => this.mediumRiskPANs.has(PAN),
        () => ({
          customer_name: customer_name,
          status: Status.SUCCESS,
          risk_score: this.getRandomInt([41, 70]),
          match_found: true,
          match_details: null,
          sanctions_list_match: SanctionListMatch.RBI_DEFAULTERS_LIST,
          pep_status: false,
          adverse_media: true,
          watchlist_match_score: this.getRandomInt([50, 71]),
          risk_category: RiskCategory.MEDIUM,
          action_required: ActionRequired.REVIEW_REQUIRED,
          fraud_alert: false,
          request_id: randomUUID(),
          timestamp: new Date().toISOString(),
        }),
      ],
    ];

    // Find the first matching rule
    for (const [predicate, resultTemplate] of rules) {
      if (predicate()) {
        return this.buildResponse(resultTemplate());
      }
    }
    return this.buildResponse({});
  }
  // Utility methods
  private getRandomInt([min, max]: [number, number]): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private buildResponse(
    overrides: Partial<AmlCheckResponse>,
  ): AmlCheckResponse {
    // Convert tuple ranges like [71, 99] into numbers where required
    const pick = (val: number | [number, number]) =>
      Array.isArray(val) ? this.getRandomInt(val) : val;

    return {
      customer_name: overrides.customer_name ?? 'No name provided',
      status: Status.SUCCESS,
      risk_score: pick(overrides.risk_score ?? [0, 20]),
      match_found: overrides.match_found ?? false,
      match_details: null,
      sanctions_list_match:
        overrides.sanctions_list_match ?? SanctionListMatch.NONE,
      pep_status: overrides.pep_status ?? false,
      adverse_media: overrides.adverse_media ?? false,
      watchlist_match_score: pick(overrides.watchlist_match_score ?? [0, 10]),
      risk_category: overrides.risk_category ?? RiskCategory.LOW,
      action_required: overrides.action_required ?? ActionRequired.APPROVE,
      fraud_alert: overrides.fraud_alert ?? false,
      request_id: randomUUID(),
      timestamp: new Date().toISOString(),
    };
  }
}
