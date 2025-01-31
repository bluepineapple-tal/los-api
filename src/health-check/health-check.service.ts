import { DataSource } from 'typeorm';

import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class HealthCheckService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly logger: Logger, // instantiate logger
  ) {}

  SERVICE: string = HealthCheckService.name;

  async checkDatabase(): Promise<string> {
    try {
      await this.dataSource.query('SELECT 1'); // Simple query

      this.logger.log('Database connection is successful', this.SERVICE);
      return 'Database connection is successful';
    } catch (error) {
      this.logger.error(
        'Database connection failed',
        error.stack,
        this.SERVICE,
      );
      throw new Error(`Database connection failed: ${error.message}`);
    }
  }
}
