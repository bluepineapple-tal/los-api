import { Test, TestingModule } from '@nestjs/testing';
import { ExternalChecksService } from './external-checks.service';

describe('ExternalChecksService', () => {
  let service: ExternalChecksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExternalChecksService],
    }).compile();

    service = module.get<ExternalChecksService>(ExternalChecksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
