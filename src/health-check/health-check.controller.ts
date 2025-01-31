import { Controller, Get } from '@nestjs/common';

import { HealthCheckService } from './health-check.service';

@Controller('health')
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get('db')
  async checkDatabase(): Promise<string> {
    return this.healthCheckService.checkDatabase();
  }
}
