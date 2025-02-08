import { Product } from 'src/products/product.entity';
import { Vendor } from 'src/users/vendor.entity';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from './products.controller';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Vendor])],
  providers: [ProductsResolver, ProductsService],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
