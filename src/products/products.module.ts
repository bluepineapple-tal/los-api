import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductMakeController } from './product-make/product-make.controller';
import { ProductMake } from './product-make/product-make.entity';
import { ProductMakeService } from './product-make/product-make.service';
import { ProductModelController } from './product-model/product-model.controller';
import { ProductModel } from './product-model/product-model.entity';
import { ProductModelService } from './product-model/product-model.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductMake, ProductModel])],
  providers: [ProductMakeService, ProductModelService],
  controllers: [ProductMakeController, ProductModelController],
  exports: [ProductMakeService, ProductModelService],
})
export class ProductsModule {}
