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

import { CreateProductModelDto } from './dtos/create-product-model.dto';
import { UpdateProductModelDto } from './dtos/update-product-model.dto';
import { ProductModel } from './product-model.entity';
import { ProductModelService } from './product-model.service';

@Controller('product-model')
export class ProductModelController {
  constructor(private readonly productModelService: ProductModelService) {}

  @Get()
  async findAll(): Promise<ProductModel[]> {
    return this.productModelService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ProductModel> {
    return this.productModelService.findOne(id);
  }

  @Get('slug/:slug')
  async findOneBySlug(@Param('slug') slug: string): Promise<ProductModel> {
    return this.productModelService.findOneBySlug(slug);
  }

  @Get('make/:makeId')
  async findByMake(
    @Param('makeId', ParseUUIDPipe) makeId: string,
  ): Promise<ProductModel[]> {
    return this.productModelService.findByMake(makeId);
  }

  @Get('make/slug/:slug')
  async findByMakeSlug(@Param('slug') slug: string): Promise<ProductModel[]> {
    return this.productModelService.findByMakeSlug(slug);
  }

  @Post()
  async create(@Body() dto: CreateProductModelDto): Promise<ProductModel> {
    return this.productModelService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProductModelDto,
  ): Promise<ProductModel> {
    return this.productModelService.update(id, dto);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<{ success: boolean }> {
    const success = await this.productModelService.remove(id);
    return { success };
  }
}
