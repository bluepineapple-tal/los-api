import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UpdateProductMakeDto } from '../product-make/dtos/update-product-make';
import { ProductMake } from '../product-make/product-make.entity';
import { ProductModel } from './product-model.entity';
import { CreateProductModelDto } from './dtos/create-product-model.dto';

@Injectable()
export class ProductModelService {
  constructor(
    @InjectRepository(ProductModel)
    private readonly modelRepo: Repository<ProductModel>,
    @InjectRepository(ProductMake)
    private readonly makeRepo: Repository<ProductMake>,
  ) {}

  async findAll(): Promise<ProductModel[]> {
    return this.modelRepo.find({});
  }

  async findOne(id: string): Promise<ProductModel> {
    const model = await this.modelRepo.findOne({
      where: { id },
    });
    if (!model) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    return model;
  }

  async findByMake(makeId: string): Promise<ProductModel[]> {
    return this.modelRepo.find({
      where: { make: { id: makeId } }, // Assuming eager loading for 'make'
      relations: ['make'],
    });
  }

  async create(dto: CreateProductModelDto): Promise<ProductModel> {
    const make = await this.makeRepo.findOne({ where: { id: dto.makeId } });
    if (!make) throw new NotFoundException('ProductMake not found');

    const newModel = this.modelRepo.create({
      name: dto.name,
      price: dto.price,
      make,
    });
    return this.modelRepo.save(newModel);
  }

  async update(id: string, dto: UpdateProductMakeDto): Promise<ProductModel> {
    const model = await this.findOne(id);
    if (!model) {
      throw new NotFoundException(`Product Model with ID "${id}" not found`);
    }
    // Update other fields if provided
    if (dto.name !== undefined) model.name = dto.name;
    if (dto.description !== undefined) model.description = dto.description;
    if (dto.status !== undefined) model.status = dto.status;

    return this.makeRepo.save(model);
  }

  async remove(id: string): Promise<boolean> {
    const model = await this.findOne(id);
    if (!model) {
      throw new NotFoundException(`Product Model with ID "${id}" not found`);
    }
    await this.modelRepo.remove(model);
    return true;
  }
}
