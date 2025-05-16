import { AmlCheckResponse } from './dtos/aml-check.response';
import { AmlCheckInput } from './dtos/aml-check.dto';
import { AmlCheckService } from './aml-check.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('aml-check')
export class AmlCheckController {
  constructor(private readonly service: AmlCheckService) {}

  @Post()
  getMockScore(@Body() body: AmlCheckInput): AmlCheckResponse {
    return this.service.amlCheck(body);
  }
}
