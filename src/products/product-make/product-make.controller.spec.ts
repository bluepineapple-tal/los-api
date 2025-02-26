import { Test, TestingModule } from '@nestjs/testing';
import { ProductMakeController } from './product-make.controller';

describe('ProductMakeController', () => {
  let controller: ProductMakeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductMakeController],
    }).compile();

    controller = module.get<ProductMakeController>(ProductMakeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
