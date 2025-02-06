import { Test, TestingModule } from '@nestjs/testing';

import { LoanOffersController } from './loan-offers.controller';

describe('LoanOffersController', () => {
  let controller: LoanOffersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoanOffersController],
    }).compile();

    controller = module.get<LoanOffersController>(LoanOffersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
