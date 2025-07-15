import { Module } from '@nestjs/common';

import { KycCheckController } from './kyc-check.controller';
import { KycCheckResolver } from './kyc-check.resolver';
import { KycCheckService } from './kyc-check.service';

@Module({
  providers: [KycCheckService, KycCheckResolver],
  controllers: [KycCheckController],
  exports: [KycCheckService],
})
export class KycCheckModule {}
