import { LoanApplication } from 'src/loan-applications/loan-application.entity';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreditCheckModule } from './credit-check/credit-check.module';
import { ExternalCheck } from './external-check.entity';
import { ExternalChecksController } from './external-checks.controller';
import { ExternalChecksResolver } from './external-checks.resolver';
import { ExternalChecksService } from './external-checks.service';
import { KycCheckModule } from './kyc-check/kyc-check.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExternalCheck, LoanApplication]),
    CreditCheckModule,
    KycCheckModule,
  ],
  providers: [ExternalChecksService, ExternalChecksResolver],
  controllers: [ExternalChecksController],
  exports: [ExternalChecksService],
})
export class ExternalChecksModule {}
