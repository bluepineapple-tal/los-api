import { Body, Controller, Post } from '@nestjs/common';

import { CreditCheckService } from './credit-check.service';
import { CreditCheckInput } from './dtos/credit-check.dto';
import { CreditCheckResponse } from './dtos/credit-check.response';

@Controller('credit-check')
export class CreditCheckController {
  constructor(private readonly service: CreditCheckService) {}

  @Post('score')
  getMockScore(@Body() body: CreditCheckInput): CreditCheckResponse {
    return this.service.generateScore(body);
  }
}
