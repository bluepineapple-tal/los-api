import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductCategoriesController } from './product-categories/product-categories.controller';
import { ProductCategoriesResolver } from './product-categories/product-categories.resolver';
import { ProductCategoriesService } from './product-categories/product-categories.service';
import { ProductCategory } from './product-categories/product-category.entity';
import { ProductMakeController } from './product-make/product-make.controller';
import { ProductMake } from './product-make/product-make.entity';
import { ProductMakeResolver } from './product-make/product-make.resolver';
import { ProductMakeService } from './product-make/product-make.service';
import { ProductModelController } from './product-model/product-model.controller';
import { ProductModel } from './product-model/product-model.entity';
import { ProductModelResolver } from './product-model/product-model.resolver';
import { ProductModelService } from './product-model/product-model.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductMake, ProductModel, ProductCategory]),
  ],
  providers: [
    ProductMakeService,
    ProductMakeResolver,
    ProductModelService,
    ProductModelResolver,
    ProductCategoriesService,
    ProductCategoriesResolver,
  ],
  controllers: [
    ProductMakeController,
    ProductModelController,
    ProductCategoriesController,
  ],
  exports: [ProductMakeService, ProductModelService, ProductCategoriesService],
})
export class ProductsModule {}
