// src/loan-applications/loan-applications.service.ts

import { ProductCategory } from 'src/products/product-categories/product-category.entity';
import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { LoanOffer } from '../loan-offers/loan-offer.entity';
import { ConsumerDetails } from '../users/consumer.entity';
import { User } from '../users/user.entity';
import { CreateLoanApplicationDto } from './dtos/create-loan-application.dto';
import { UpdateLoanApplicationDto } from './dtos/update-loan-application.dto';
import { ApplicationStatus, LoanApplication } from './loan-application.entity';

@Injectable()
export class LoanApplicationsService {
  constructor(
    @InjectRepository(LoanApplication)
    private readonly repo: Repository<LoanApplication>,

    @InjectRepository(ConsumerDetails)
    private readonly consumerRepo: Repository<ConsumerDetails>,

    @InjectRepository(ProductCategory)
    private readonly categoryRepo: Repository<ProductCategory>,

    @InjectRepository(LoanOffer)
    private readonly offerRepo: Repository<LoanOffer>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findAll(): Promise<LoanApplication[]> {
    return this.repo.find({
      relations: [
        'consumer',
        'productCategory',
        'selectedOffer',
        'underwriter',
      ],
    });
  }

  async findOne(id: string): Promise<LoanApplication> {
    const app = await this.repo.findOne({
      where: { id },
      relations: [
        'consumer',
        'productCategory',
        'selectedOffer',
        'underwriter',
      ],
    });
    if (!app) {
      throw new NotFoundException(`LoanApplication ${id} not found`);
    }
    return app;
  }

  async create(dto: CreateLoanApplicationDto): Promise<LoanApplication> {
    const {
      consumerId,
      productCategoryId,
      loanOfferId,
      application_date,
      requested_amount,
      status,
      underwriterId,
    } = dto;

    // consumer
    const consumer = await this.consumerRepo.findOneBy({ id: consumerId });
    if (!consumer) {
      throw new NotFoundException(`Consumer ${consumerId} not found`);
    }

    // product category
    const category = await this.categoryRepo.findOneBy({
      id: productCategoryId,
    });
    if (!category) {
      throw new NotFoundException(
        `ProductCategory ${productCategoryId} not found`,
      );
    }

    // optional selected offer
    let offer: LoanOffer = null;
    if (loanOfferId) {
      offer = await this.offerRepo.findOneBy({ id: loanOfferId });
      if (!offer) {
        throw new NotFoundException(`LoanOffer ${loanOfferId} not found`);
      }
    }

    // optional underwriter
    let underwriter: User = null;
    if (underwriterId) {
      underwriter = await this.userRepo.findOneBy({ id: underwriterId });
      if (!underwriter) {
        throw new NotFoundException(`User ${underwriterId} not found`);
      }
    }

    const application = this.repo.create({
      consumer,
      productCategory: category,
      selectedOffer: offer,
      application_date: application_date
        ? new Date(application_date)
        : new Date(),
      requested_amount,
      status: status ?? ApplicationStatus.DRAFT,
      underwriter,
      manual_review_needed: false,
    });

    return this.repo.save(application);
  }

  async update(
    id: string,
    dto: UpdateLoanApplicationDto,
  ): Promise<LoanApplication> {
    const app = await this.findOne(id);

    if (dto.consumerId) {
      const consumer = await this.consumerRepo.findOneBy({
        id: dto.consumerId,
      });
      if (!consumer)
        throw new NotFoundException(`Consumer ${dto.consumerId} not found`);
      app.consumer = consumer;
    }

    if (dto.productCategoryId) {
      const category = await this.categoryRepo.findOneBy({
        id: dto.productCategoryId,
      });
      if (!category)
        throw new NotFoundException(
          `ProductCategory ${dto.productCategoryId} not found`,
        );
      app.productCategory = category;
    }

    if (dto.loanOfferId) {
      const offer = await this.offerRepo.findOneBy({ id: dto.loanOfferId });
      if (!offer)
        throw new NotFoundException(`LoanOffer ${dto.loanOfferId} not found`);
      app.selectedOffer = offer;
    }

    if (dto.requested_amount !== undefined) {
      app.requested_amount = dto.requested_amount;
    }

    if (dto.status) {
      app.status = dto.status;
    }

    if (dto.underwriterId) {
      const underwriter = await this.userRepo.findOneBy({
        id: dto.underwriterId,
      });
      if (!underwriter)
        throw new NotFoundException(`User ${dto.underwriterId} not found`);
      app.underwriter = underwriter;
    }

    if (dto.manual_review_needed !== undefined) {
      app.manual_review_needed = dto.manual_review_needed;
    }

    return this.repo.save(app);
  }

  async remove(id: string): Promise<boolean> {
    const app = await this.findOne(id);
    await this.repo.remove(app);
    return true;
  }
}
