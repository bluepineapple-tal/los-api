import { Test, TestingModule } from '@nestjs/testing';
import { CreditCheckService } from './credit-check.service';

describe('CreditCheckService', () => {
  let service: CreditCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreditCheckService],
    }).compile();

    service = module.get<CreditCheckService>(CreditCheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
