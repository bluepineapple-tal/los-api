import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Vendor } from '../users/vendor.entity';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['vendor'], // if you want to load vendor info
    });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['vendor'],
    });
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    return product;
  }

  async create(dto: CreateProductDto): Promise<Product> {
    // Ensure vendor exists
    const vendor = await this.vendorRepository.findOneBy({ id: dto.vendorId });
    if (!vendor) {
      throw new NotFoundException(`Vendor with ID "${dto.vendorId}" not found`);
    }

    const product = this.productRepository.create({
      ...dto,
      vendor: vendor,
    });

    return this.productRepository.save(product);
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);

    // If vendorId is given, update the vendor relationship
    if (dto.vendorId) {
      const vendor = await this.vendorRepository.findOneBy({
        id: dto.vendorId,
      });
      if (!vendor) {
        throw new NotFoundException(
          `Vendor with ID "${dto.vendorId}" not found`,
        );
      }
      product.vendor = vendor;
    }

    // Update other fields if provided
    if (dto.name !== undefined) product.name = dto.name;
    if (dto.description !== undefined) product.description = dto.description;
    if (dto.price !== undefined) product.price = dto.price;
    if (dto.status !== undefined) product.status = dto.status;

    return this.productRepository.save(product);
  }

  async remove(id: string): Promise<boolean> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
    return true;
  }
}
