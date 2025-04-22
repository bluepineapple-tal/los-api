import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductMakeController } from './product-make/product-make.controller';
import { ProductMake } from './product-make/product-make.entity';
import { ProductMakeService } from './product-make/product-make.service';
import { ProductModelController } from './product-model/product-model.controller';
import { ProductModel } from './product-model/product-model.entity';
import { ProductModelService } from './product-model/product-model.service';
import { ProductCategoriesController } from './product-categories/product-categories.controller';
import { ProductCategoriesService } from './product-categories/product-categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductMake, ProductModel])],
  providers: [ProductMakeService, ProductModelService, ProductCategoriesService],
  controllers: [ProductMakeController, ProductModelController, ProductCategoriesController],
  exports: [ProductMakeService, ProductModelService],
})
export class ProductsModule {}
