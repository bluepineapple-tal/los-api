import { Body, Controller, Post } from '@nestjs/common';

import { KycCheckInput } from './dtos/kyc-check.dto';
import { KycCheckResponse } from './dtos/kyc-check.response';
import { KycCheckService } from './kyc-check.service';

@Controller('kyc-check')
export class KycCheckController {
  constructor(private readonly service: KycCheckService) {}

  @Post('verify')
  verify(@Body() body: KycCheckInput): KycCheckResponse {
    return this.service.verify(body);
  }
}
