import { LoanApplication } from 'src/loan-applications/loan-application.entity';
import { ManualReview } from 'src/underwriting/manual-reviews/manual-review.entity';
import { UnderwritingRule } from 'src/underwriting/rules/underwriting-rule.entity';
import { User } from 'src/users/user.entity';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ManualReviewsController } from './manual-reviews/manual-reviews.controller';
import { ManualReviewsResolver } from './manual-reviews/manual-reviews.resolver';
import { ManualReviewsService } from './manual-reviews/manual-reviews.service';
import { UnderwritingResult } from './results/underwriting-result.entity';
import { UnderwritingResultsController } from './results/underwriting-results.controller';
import { UnderwritingResultsResolver } from './results/underwriting-results.resolver';
import { UnderwritingResultsService } from './results/underwriting-results.service';
import { UnderwritingRulesController } from './rules/underwriting-rules.controller';
import { UnderwritingRulesResolver } from './rules/underwriting-rules.resolver';
import { UnderwritingRulesService } from './rules/underwriting-rules.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UnderwritingRule,
      UnderwritingResult,
      ManualReview,
      LoanApplication,
      User,
    ]),
  ],
  providers: [
    UnderwritingRulesService,
    UnderwritingRulesResolver,
    UnderwritingResultsService,
    UnderwritingResultsResolver,
    ManualReviewsService,
    ManualReviewsResolver,
  ],
  controllers: [
    UnderwritingRulesController,
    UnderwritingResultsController,
    ManualReviewsController,
  ],
  exports: [],
})
export class UnderwritingModule {}
