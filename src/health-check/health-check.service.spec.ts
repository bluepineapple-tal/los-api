import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';

import { HealthCheckService } from './health-check.service';

describe('HealthcheckService', () => {
  let service: HealthCheckService;

  const dataSourceMock = {
    query: jest.fn().mockResolvedValue([1]),
  } as unknown as DataSource;

  const loggerMock = {
    log: jest.fn(),
    error: jest.fn(),
  } as unknown as Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthCheckService,
        { provide: DataSource, useValue: dataSourceMock },
        { provide: Logger, useValue: loggerMock },
      ],
    }).compile();

    service = module.get<HealthCheckService>(HealthCheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('checks database connectivity', async () => {
    await expect(service.checkDatabase()).resolves.toBe(
      'Database connection is successful',
    );
    expect(dataSourceMock.query).toHaveBeenCalledWith('SELECT 1');
  });
});
