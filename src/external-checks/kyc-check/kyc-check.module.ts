import { Module } from '@nestjs/common';

import { KycCheckController } from './kyc-check.controller';
import { KycCheckResolver } from './kyc-check.resolver';
import { KycCheckService } from './kyc-check.service';

@Module({
  imports: [],
  controllers: [KycCheckController],
  providers: [KycCheckService, KycCheckResolver],
})
export class KycCheckModule {}
