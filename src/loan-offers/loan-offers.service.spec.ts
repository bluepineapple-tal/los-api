import { Test, TestingModule } from '@nestjs/testing';

import { LoanOffersService } from './loan-offers.service';

describe('LoanOffersService', () => {
  let service: LoanOffersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoanOffersService],
    }).compile();

    service = module.get<LoanOffersService>(LoanOffersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
