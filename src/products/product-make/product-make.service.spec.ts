import { Test, TestingModule } from '@nestjs/testing';
import { ProductMakeService } from './product-make.service';

describe('ProductMakeService', () => {
  let service: ProductMakeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductMakeService],
    }).compile();

    service = module.get<ProductMakeService>(ProductMakeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
