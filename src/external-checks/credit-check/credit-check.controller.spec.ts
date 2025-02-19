import { Test, TestingModule } from '@nestjs/testing';
import { CreditCheckController } from './credit-check.controller';

describe('CreditCheckController', () => {
  let controller: CreditCheckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreditCheckController],
    }).compile();

    controller = module.get<CreditCheckController>(CreditCheckController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
