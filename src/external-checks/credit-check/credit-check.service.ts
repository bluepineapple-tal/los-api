import { randomUUID } from 'node:crypto';
import { MaritalStatus, SourceOfIncome } from 'src/users/user.enums';

import { Injectable } from '@nestjs/common';

import { ScoreBand, ScoreProvider } from './credit-check.enums';
import { CreditCheckInput } from './dtos/credit-check.dto';
import { CreditCheckResponse } from './dtos/credit-check.response';

@Injectable()
export class CreditCheckService {
  async generateScore(input: CreditCheckInput): Promise<CreditCheckResponse> {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const { monthly_income, marital_status, date_of_birth, sourceOfIncome } =
      input;

    const age = this.calculateAge(date_of_birth);
    const incomePoints = this.mapIncomeToPoints(monthly_income);
    const maritalPoints = this.mapMaritalStatusToPoints(marital_status);
    const agePoints = this.mapAgeToPoints(age);
    const businessPoints = this.mapBusinessToPoints(sourceOfIncome);
    // const randomPoints = this.getRandomInt(50, 100);

    const rawScore =
      300 + incomePoints + maritalPoints + agePoints + businessPoints;
    // randomPoints;

    // Clamp 300-900
    const credit_score = Math.min(Math.max(rawScore, 300), 900);
    const score_band = this.getScoreBand(credit_score);

    // Misc metrics
    const active_accounts = this.getRandomInt(2, 5);
    const closed_accounts = this.getRandomInt(0, 2);
    const total_accounts = active_accounts + closed_accounts;
    const credit_card_accounts = this.getRandomInt(1, 2);

    const default_flag = monthly_income < 15000 ? this.getRandomBool() : false;
    const npa_status = monthly_income < 10000 ? this.getRandomBool() : false;

    return {
      credit_score,
      score_provider: this.randomScoreProvider(),
      score_range_min: 300,
      score_range_max: 900,
      score_band,
      total_accounts,
      active_accounts,
      closed_accounts,
      credit_card_accounts,
      default_flag,
      npa_status,
      request_id: randomUUID(),
      timestamp: new Date().toISOString(),
    };
  }

  // ---------- helpers ----------
  private calculateAge(dobIso: string): number {
    const date_of_birth = new Date(dobIso);
    const diff = Date.now() - date_of_birth.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  private mapIncomeToPoints(income: number): number {
    if (income >= 100_000) return 200;
    if (income >= 75_000) return 170;
    if (income >= 50_000) return 140;
    if (income >= 30_000) return 100;
    if (income >= 15_000) return 60;
    return 30;
  }

  private mapMaritalStatusToPoints(status: MaritalStatus): number {
    switch (status) {
      case MaritalStatus.MARRIED:
        return 100;
      case MaritalStatus.SINGLE:
        return 70;
      case MaritalStatus.DIVORCED:
      case MaritalStatus.WIDOWED:
        return 50;
      default:
        return 30;
    }
  }

  private mapAgeToPoints(age: number): number {
    if (age >= 25 && age <= 45) return 100;
    if (age >= 18 && age <= 24) return 70;
    if (age >= 46 && age <= 60) return 80;
    if (age >= 61 && age <= 70) return 50;
    return 30;
  }

  private mapBusinessToPoints(nature: SourceOfIncome): number {
    switch (nature) {
      case SourceOfIncome.SALARIED:
        return 100;
      case SourceOfIncome.SELF_EMPLOYED:
        return 80;
      case SourceOfIncome.BUSINESS:
        return 70;
      case SourceOfIncome.FREELANCER:
        return 60;
      case SourceOfIncome.UNEMPLOYED:
        return 20;
      default:
        return 30;
    }
  }

  private getScoreBand(score: number): ScoreBand {
    if (score >= 800) return ScoreBand.EXCELLENT;
    if (score >= 740) return ScoreBand.VERY_GOOD;
    if (score >= 670) return ScoreBand.GOOD;
    if (score >= 580) return ScoreBand.FAIR;
    return ScoreBand.POOR;
  }

  private randomScoreProvider(): ScoreProvider {
    const providers = Object.values(ScoreProvider);
    return providers[this.getRandomInt(0, providers.length - 1)];
  }

  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private getRandomBool(): boolean {
    return Math.random() < 0.5;
  }
}
