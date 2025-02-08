import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Product } from '../products/product.entity';
import { User } from '../users/user.entity';
import { CreateLoanOfferDto } from './dtos/create-loan-offer.dto';
import { UpdateLoanOfferDto } from './dtos/update-loan-offer.dto';
import { LoanOffer } from './loan-offer.entity';

@Injectable()
export class LoanOffersService {
  constructor(
    @InjectRepository(LoanOffer)
    private readonly loanOfferRepo: Repository<LoanOffer>,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findAll(): Promise<LoanOffer[]> {
    // If we want to load relationships: .find({ relations: ['product', 'created_by'] })
    return this.loanOfferRepo.find({
      relations: ['product', 'created_by'],
    });
  }

  async findOne(id: string): Promise<LoanOffer> {
    const offer = await this.loanOfferRepo.findOne({
      where: { id },
      relations: ['product', 'created_by'],
    });
    if (!offer) {
      throw new NotFoundException(`LoanOffer with id="${id}" not found`);
    }
    return offer;
  }

  async create(dto: CreateLoanOfferDto): Promise<LoanOffer> {
    const { productId, createdById, ...rest } = dto;

    // Check product
    const product = await this.productRepo.findOneBy({ id: productId });
    if (!product) {
      throw new NotFoundException(`Product with id="${productId}" not found`);
    }

    // Optional: Check user if passed
    let user: User | null = null;
    if (createdById) {
      user = await this.userRepo.findOneBy({ id: createdById });
      if (!user) {
        throw new NotFoundException(`User with id="${createdById}" not found`);
      }
    }

    const newOffer = this.loanOfferRepo.create({
      ...rest,
      product,
      created_by: user ?? undefined,
    });

    return this.loanOfferRepo.save(newOffer);
  }

  async update(id: string, dto: UpdateLoanOfferDto): Promise<LoanOffer> {
    const offer = await this.findOne(id);

    if (dto.productId) {
      const product = await this.productRepo.findOneBy({ id: dto.productId });
      if (!product) {
        throw new NotFoundException(
          `Product with id="${dto.productId}" not found`,
        );
      }
      offer.product = product;
    }

    if (dto.createdById) {
      const user = await this.userRepo.findOneBy({ id: dto.createdById });
      if (!user) {
        throw new NotFoundException(
          `User with id="${dto.createdById}" not found`,
        );
      }
      offer.created_by = user;
    }

    if (dto.interest_rate !== undefined) {
      offer.interest_rate = dto.interest_rate;
    }
    if (dto.tenure_months !== undefined) {
      offer.tenure_months = dto.tenure_months;
    }
    if (dto.processing_fee !== undefined) {
      offer.processing_fee = dto.processing_fee;
    }
    if (dto.offer_name !== undefined) {
      offer.offer_name = dto.offer_name;
    }
    if (dto.offer_details !== undefined) {
      offer.offer_details = dto.offer_details;
    }
    if (dto.is_active !== undefined) {
      offer.is_active = dto.is_active;
    }

    return this.loanOfferRepo.save(offer);
  }

  async remove(id: string): Promise<boolean> {
    const offer = await this.findOne(id);
    await this.loanOfferRepo.remove(offer);
    return true;
  }
}
