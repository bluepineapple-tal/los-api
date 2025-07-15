import { Module } from '@nestjs/common';

import { CreditCheckController } from './credit-check.controller';
import { CreditCheckResolver } from './credit-check.resolver';
import { CreditCheckService } from './credit-check.service';

@Module({
  providers: [CreditCheckService, CreditCheckResolver],
  controllers: [CreditCheckController],
  exports: [CreditCheckService],
})
export class CreditCheckModule {}
