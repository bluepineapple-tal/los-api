// src/loan-applications/loan-applications.service.ts

import { ProductModel } from 'src/products/product-model/product-model.entity';
import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { LoanOffer } from '../loan-offers/loan-offer.entity';
import { Consumer } from '../users/consumer.entity';
import { User } from '../users/user.entity';
import { CreateLoanApplicationDto } from './dtos/create-loan-application.dto';
import { UpdateLoanApplicationDto } from './dtos/update-loan-application.dto';
import { ApplicationStatus, LoanApplication } from './loan-application.entity';

@Injectable()
export class LoanApplicationsService {
  constructor(
    @InjectRepository(LoanApplication)
    private readonly loanApplicationRepository: Repository<LoanApplication>,

    @InjectRepository(Consumer)
    private readonly consumerRepository: Repository<Consumer>,

    @InjectRepository(ProductModel)
    private readonly productModelRepository: Repository<ProductModel>,

    @InjectRepository(LoanOffer)
    private readonly loanOfferRepository: Repository<LoanOffer>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<LoanApplication[]> {
    return this.loanApplicationRepository.find({
      relations: ['consumer', 'product', 'loan_offer', 'underwriter'],
    });
  }

  async findOne(id: string): Promise<LoanApplication> {
    const application = await this.loanApplicationRepository.findOne({
      where: { id },
      relations: ['consumer', 'product', 'loan_offer', 'underwriter'],
    });
    if (!application) {
      throw new NotFoundException(`Loan Application with ID "${id}" not found`);
    }
    return application;
  }

  async create(dto: CreateLoanApplicationDto): Promise<LoanApplication> {
    const {
      consumerId,
      productModelId,
      loanOfferId,
      application_date,
      requested_amount,
      status,
      underwriterId,
    } = dto;

    // Look up Consumer, Product, LoanOffer, Underwriter
    const consumer = await this.consumerRepository.findOne({
      where: { id: consumerId },
    });
    if (!consumer) {
      throw new NotFoundException(`Consumer with ID "${consumerId}" not found`);
    }

    const productModel = await this.productModelRepository.findOne({
      where: { id: productModelId },
    });
    if (!productModel) {
      throw new NotFoundException(
        `Product Model with ID "${productModelId}" not found`,
      );
    }

    const loanOffer = await this.loanOfferRepository.findOne({
      where: { id: loanOfferId },
    });
    if (!loanOffer) {
      throw new NotFoundException(
        `Loan Offer with ID "${loanOfferId}" not found`,
      );
    }

    let underwriter: User = null;
    if (underwriterId) {
      underwriter = await this.userRepository.findOne({
        where: { id: underwriterId },
      });
      if (!underwriter) {
        throw new NotFoundException(
          `Underwriter with ID "${underwriterId}" not found`,
        );
      }
    }

    const application = this.loanApplicationRepository.create({
      consumer,
      productModel,
      loan_offer: loanOffer,
      underwriter: underwriter || null,
      application_date: application_date
        ? new Date(application_date)
        : new Date(),
      requested_amount,
      status: status || ApplicationStatus.DRAFT,
      manual_review_needed: false, // default to false
    });

    return this.loanApplicationRepository.save(application);
  }

  async update(
    id: string,
    dto: UpdateLoanApplicationDto,
  ): Promise<LoanApplication> {
    const application = await this.findOne(id);

    // Update Consumer if provided
    if (dto.consumerId) {
      const consumer = await this.consumerRepository.findOne({
        where: { id: dto.consumerId },
      });
      if (!consumer) {
        throw new NotFoundException(
          `Consumer with ID "${dto.consumerId}" not found`,
        );
      }
      application.consumer = consumer;
    }

    // Update Product if provided
    if (dto.productModelId) {
      const productModel = await this.productModelRepository.findOne({
        where: { id: dto.productModelId },
      });
      if (!productModel) {
        throw new NotFoundException(
          `Product with ID "${dto.productModelId}" not found`,
        );
      }
      application.productModel = productModel;
    }

    // Update LoanOffer if provided
    if (dto.loanOfferId) {
      const loanOffer = await this.loanOfferRepository.findOne({
        where: { id: dto.loanOfferId },
      });
      if (!loanOffer) {
        throw new NotFoundException(
          `Loan Offer with ID "${dto.loanOfferId}" not found`,
        );
      }
      application.loan_offer = loanOffer;
    }

    // Update requested_amount
    if (dto.requested_amount !== undefined) {
      application.requested_amount = dto.requested_amount;
    }

    // Update status
    if (dto.status) {
      application.status = dto.status;
    }

    // Update underwriter if provided
    if (dto.underwriterId) {
      const underwriter = await this.userRepository.findOne({
        where: { id: dto.underwriterId },
      });
      if (!underwriter) {
        throw new NotFoundException(
          `Underwriter with ID "${dto.underwriterId}" not found`,
        );
      }
      application.underwriter = underwriter;
    }

    if (dto.manual_review_needed !== undefined) {
      application.manual_review_needed = dto.manual_review_needed;
    }

    return this.loanApplicationRepository.save(application);
  }

  async remove(id: string): Promise<boolean> {
    const application = await this.findOne(id);
    await this.loanApplicationRepository.remove(application);
    return true;
  }
}
