import { Module } from '@nestjs/common';
import { CreditCheckService } from './credit-check.service';
import { CreditCheckController } from './credit-check.controller';

@Module({
  providers: [CreditCheckService],
  controllers: [CreditCheckController],
})
export class CreditCheckModule {}
