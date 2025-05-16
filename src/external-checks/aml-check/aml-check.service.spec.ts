import { Test, TestingModule } from '@nestjs/testing';
import { AmlCheckService } from './aml-check.service';

describe('AmlCheckService', () => {
  let service: AmlCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AmlCheckService],
    }).compile();

    service = module.get<AmlCheckService>(AmlCheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
