import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';

import { CreateProductCategoryDto } from './dtos/create-product-category.dto';
import { UpdateProductCategoryDto } from './dtos/update-product-category.dto';
import { ProductCategoriesService } from './product-categories.service';
import { ProductCategory } from './product-category.entity';

@Controller('product-categories')
export class ProductCategoriesController {
  constructor(private readonly svc: ProductCategoriesService) {}

  @Get()
  async findAll(): Promise<ProductCategory[]> {
    return this.svc.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ProductCategory> {
    return this.svc.findOne(id);
  }

  @Post()
  async create(
    @Body() dto: CreateProductCategoryDto,
  ): Promise<ProductCategory> {
    return this.svc.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProductCategoryDto,
  ): Promise<ProductCategory> {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<{ success: boolean }> {
    return this.svc.remove(id).then((ok) => ({ success: ok }));
  }
}
