import { Test, TestingModule } from '@nestjs/testing';
import { ExternalChecksController } from './external-checks.controller';

describe('ExternalChecksController', () => {
  let controller: ExternalChecksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExternalChecksController],
    }).compile();

    controller = module.get<ExternalChecksController>(ExternalChecksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
