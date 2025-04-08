import { LoanApplication } from 'src/loan-applications/loan-application.entity';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExternalCheck } from './external-check.entity';
import { ExternalChecksController } from './external-checks.controller';
import { ExternalChecksService } from './external-checks.service';
import { CreditCheckModule } from './credit-check/credit-check.module';
import { KycCheckModule } from './kyc-check/kyc-check.module';

@Module({
  imports: [TypeOrmModule.forFeature([ExternalCheck, LoanApplication]), CreditCheckModule, KycCheckModule],
  providers: [ExternalChecksService, ExternalChecksController],
  controllers: [ExternalChecksController],
  exports: [ExternalChecksService],
})
export class ExternalChecksModule {}
