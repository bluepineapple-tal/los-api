import { Repository } from 'typeorm';

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ProductMake } from '../product-make/product-make.entity';
import { CreateProductModelDto } from './dtos/create-product-model.dto';
import { UpdateProductModelDto } from './dtos/update-product-model.dto';
import { ProductModel } from './product-model.entity';

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

  async findOneBySlug(slug: string): Promise<ProductModel> {
    const model = await this.modelRepo.findOne({ where: { slug } });
    if (!model) {
      throw new NotFoundException(
        `Product Model with slug "${slug}" not found`,
      );
    }
    return model;
  }

  async findByMake(makeId: string): Promise<ProductModel[]> {
    return this.modelRepo.find({
      where: { make: { id: makeId } }, // Assuming eager loading for 'make'
      relations: ['make'],
    });
  }

  async findByMakeSlug(slug: string): Promise<ProductModel[]> {
    const make = await this.makeRepo.findOne({ where: { slug } });
    if (!make) {
      throw new NotFoundException(`Product Make with slug "${slug}" not found`);
    }
    return this.modelRepo.find({
      where: { make: { id: make.id } },
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
      description: dto.description,
      status: dto.status,
    });

    try {
      return await this.modelRepo.save(newModel);
    } catch (error) {
      // PostgreSQL unique violation error code
      if (error.code === '23505') {
        throw new ConflictException(
          'A product model with these details already exists.',
        );
      }
      throw error;
    }
  }

  async update(id: string, dto: UpdateProductModelDto): Promise<ProductModel> {
    const model = await this.findOne(id);
    if (!model) {
      throw new NotFoundException(`Product Model with ID "${id}" not found`);
    }
    // Update other fields if provided
    if (dto.name !== undefined) model.name = dto.name;
    if (dto.description !== undefined) model.description = dto.description;
    if (dto.status !== undefined) model.status = dto.status;
    if (dto.price !== undefined) model.price = dto.price;

    return this.modelRepo.save(model);
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
