import { Repository } from 'typeorm';

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateProductMakeDto } from './dtos/create-product-make.dto';
import { UpdateProductMakeDto } from './dtos/update-product-make';
import { ProductMake } from './product-make.entity';

@Injectable()
export class ProductMakeService {
  constructor(
    @InjectRepository(ProductMake)
    private readonly makeRepo: Repository<ProductMake>,
  ) {}

  async findAll(): Promise<ProductMake[]> {
    return this.makeRepo.find({});
  }

  async findOne(id: string): Promise<ProductMake> {
    const product = await this.makeRepo.findOne({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    return product;
  }

  async findBySlug(slug: string): Promise<ProductMake> {
    const product = await this.makeRepo.findOne({ where: { slug } });
    if (!product) {
      throw new NotFoundException(`Product with slug "${slug}" not found`);
    }
    return product;
  }

  async create(dto: CreateProductMakeDto): Promise<ProductMake> {
    const product = this.makeRepo.create(dto);

    try {
      return await this.makeRepo.save(product);
    } catch (error) {
      // PostgreSQL unique violation error code
      if (error.code === '23505') {
        throw new ConflictException(
          'A product make with these details already exists.',
        );
      }
      throw error;
    }
  }

  async update(id: string, dto: UpdateProductMakeDto): Promise<ProductMake> {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product Make with ID "${id}" not found`);
    }
    // Update other fields if provided
    if (dto.name !== undefined) product.name = dto.name;
    if (dto.description !== undefined) product.description = dto.description;
    if (dto.status !== undefined) product.status = dto.status;

    return this.makeRepo.save(product);
  }

  async remove(id: string): Promise<boolean> {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product Make with ID "${id}" not found`);
    }
    await this.makeRepo.remove(product);
    return true;
  }
}
