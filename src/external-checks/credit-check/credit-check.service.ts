import { Injectable } from '@nestjs/common';
import {
  CreditCheckDto,
  CreditHistory,
  NatureOfBusiness,
  ResidenceType,
} from './dtos/credit-check.dto';

@Injectable()
export class CreditCheckService {
  calculateMockScore(creditCheckDto: CreditCheckDto): number {
    let score = 300; // Base score

    const { income, creditHistory, natureOfBusiness, residenceType, age } =
      creditCheckDto;

    // 1. Income-based weighting
    //    We could also consider monthly debt / obligations to refine.
    if (income < 20000) {
      score += 20; // Low-income bracket
    } else if (income < 50000) {
      score += 60;
    } else if (income < 100000) {
      score += 100;
    } else {
      score += 150; // High-income bracket
    }

    // 2. Credit History weighting
    switch (creditHistory) {
      case CreditHistory.GOOD:
        score += 250;
        break;
      case CreditHistory.FAIR:
        score += 100;
        break;
      case CreditHistory.POOR:
        score -= 50;
        break;
    }

    // 3. Nature of Business weighting
    switch (natureOfBusiness) {
      case NatureOfBusiness.SALARIED:
        score += 80;
        break;
      case NatureOfBusiness.SELF_EMPLOYED:
        score += 40;
        break;
      case NatureOfBusiness.FREELANCER:
        score += 30;
        break;
      case NatureOfBusiness.UNEMPLOYED:
        score -= 20;
        break;
    }

    // 4. Residence Type weighting
    switch (residenceType) {
      case ResidenceType.OWN:
        score += 30;
        break;
      case ResidenceType.RENTED:
        score += 10;
        break;
    }

    // 5. Age-based weighting
    if (age < 25) {
      score += 15;
    } else if (age <= 35) {
      score += 25;
    } else if (age <= 50) {
      score += 15;
    } else {
      score -= 10;
    }

    // 6. Optional: Additional constraints or custom logic
    //    e.g., if user is self-employed and has poor credit history, reduce further, etc.
    if (
      natureOfBusiness === NatureOfBusiness.SELF_EMPLOYED &&
      creditHistory === CreditHistory.POOR
    ) {
      score -= 30;
    }

    // Ensure final score remains in typical 300–900 range
    if (score < 300) {
      score = 300;
    }
    if (score > 900) {
      score = 900;
    }

    return score;
  }
}
