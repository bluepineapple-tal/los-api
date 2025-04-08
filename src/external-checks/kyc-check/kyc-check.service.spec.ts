import { Test, TestingModule } from '@nestjs/testing';
import { KycCheckService } from './kyc-check.service';

describe('KycCheckService', () => {
  let service: KycCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KycCheckService],
    }).compile();

    service = module.get<KycCheckService>(KycCheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
