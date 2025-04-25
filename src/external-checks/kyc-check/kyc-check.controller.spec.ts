import { Test, TestingModule } from '@nestjs/testing';
import { KycCheckController } from './kyc-check.controller';

describe('KycCheckController', () => {
  let controller: KycCheckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KycCheckController],
    }).compile();

    controller = module.get<KycCheckController>(KycCheckController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
