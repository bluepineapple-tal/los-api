import { Module } from '@nestjs/common';
import { KycCheckService } from './kyc-check.service';
import { KycCheckController } from './kyc-check.controller';

@Module({
  providers: [KycCheckService],
  controllers: [KycCheckController]
})
export class KycCheckModule {}
