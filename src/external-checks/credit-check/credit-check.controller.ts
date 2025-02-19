import { Controller, Post, Body } from '@nestjs/common';
import { CreditCheckService } from './credit-check.service';
import { CreditCheckDto } from './dtos/credit-check.dto';

@Controller('credit-check')
export class CreditCheckController {
  constructor(private readonly creditCheckService: CreditCheckService) {}

  @Post('score')
  getMockCibilScore(@Body() creditCheckDto: CreditCheckDto): { score: number } {
    const score = this.creditCheckService.calculateMockScore(creditCheckDto);
    return { score };
  }
}
