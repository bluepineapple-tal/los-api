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

import { CreateProductMakeDto } from './dtos/create-product-make.dto';
import { UpdateProductMakeDto } from './dtos/update-product-make';
import { ProductMake } from './product-make.entity';
import { ProductMakeService } from './product-make.service';

@Controller('product-make')
export class ProductMakeController {
  constructor(private readonly productMakeService: ProductMakeService) {}

  @Get()
  async findAll(): Promise<ProductMake[]> {
    return this.productMakeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ProductMake> {
    return this.productMakeService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateProductMakeDto): Promise<ProductMake> {
    return this.productMakeService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProductMakeDto,
  ): Promise<ProductMake> {
    return this.productMakeService.update(id, dto);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<{ success: boolean }> {
    const success = await this.productMakeService.remove(id);
    return { success };
  }
}
