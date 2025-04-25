import { LoanApplication } from 'src/loan-applications/loan-application.entity';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExternalCheck } from './external-check.entity';
import { ExternalChecksController } from './external-checks.controller';
import { ExternalChecksService } from './external-checks.service';
import { CreditCheckModule } from './credit-check/credit-check.module';
import { AmlCheckModule } from './aml-check/aml-check.module';

@Module({
  imports: [TypeOrmModule.forFeature([ExternalCheck, LoanApplication]), CreditCheckModule, AmlCheckModule],
  providers: [ExternalChecksService, ExternalChecksController],
  controllers: [ExternalChecksController],
  exports: [ExternalChecksService],
})
export class ExternalChecksModule {}
