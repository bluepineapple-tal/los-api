import { Test, TestingModule } from '@nestjs/testing';
import { UnderwritingService } from './underwriting.service';

describe('UnderwritingService', () => {
  let service: UnderwritingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnderwritingService],
    }).compile();

    service = module.get<UnderwritingService>(UnderwritingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
