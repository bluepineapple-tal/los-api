// src/external-checks/kyc-check/kyc-check.controller.ts
import { Body, Controller, Post } from '@nestjs/common';

import { SimulateKycInput } from './dtos/create-kyc-check.dto';
import { KycCheckService } from './kyc-check.service';

@Controller('kyc-check')
export class KycCheckController {
  constructor(private readonly svc: KycCheckService) {}

  @Post('simulate')
  simulate(@Body() dto: SimulateKycInput) {
    return this.svc.simulate(dto);
  }
}
