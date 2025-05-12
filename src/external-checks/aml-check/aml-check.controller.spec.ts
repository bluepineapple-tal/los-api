import { Test, TestingModule } from '@nestjs/testing';
import { AmlCheckController } from './aml-check.controller';

describe('AmlCheckController', () => {
  let controller: AmlCheckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AmlCheckController],
    }).compile();

    controller = module.get<AmlCheckController>(AmlCheckController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
