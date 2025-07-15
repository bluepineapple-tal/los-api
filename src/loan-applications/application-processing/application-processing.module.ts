import { ExternalChecksModule } from 'src/external-checks/external-checks.module';
import { UnderwritingModule } from 'src/underwriting/underwriting.module';

import { BullModule } from '@nestjs/bullmq';
import { forwardRef, Logger, Module } from '@nestjs/common';

import { LoanApplicationsModule } from '../loan-applications.module';
import { DecisionEngine } from './decision-engine.service';
import { LoanProcessingProcessor } from './loan-processing.processor';
import { LoanProcessingProducer } from './loan-processing.producer';
import { KycCheckModule } from 'src/external-checks/kyc-check/kyc-check.module';
import { AmlCheckModule } from 'src/external-checks/aml-check/aml-check.module';
import { CreditCheckModule } from 'src/external-checks/credit-check/credit-check.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'loan-processing',
      defaultJobOptions: {
        attempts: 3,
        backoff: { type: 'exponential', delay: 5_000 },
      },
    }),
    forwardRef(() => LoanApplicationsModule),
    ExternalChecksModule,
    KycCheckModule,
    AmlCheckModule,
    CreditCheckModule,
    UnderwritingModule,
  ],
  providers: [
    LoanProcessingProducer,
    LoanProcessingProcessor,
    DecisionEngine,
    Logger,
  ],
  exports: [LoanProcessingProducer],
})
export class ApplicationProcessingModule {}
