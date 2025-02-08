// src/underwriting/manual-reviews/manual-reviews.service.ts

import { LoanApplication } from 'src/loan-applications/loan-application.entity';
import { ManualReview } from 'src/underwriting/manual-reviews/manual-review.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateManualReviewDto } from './dtos/create-manual-review.dto';
import { UpdateManualReviewDto } from './dtos/update-manual-review.dto';

@Injectable()
export class ManualReviewsService {
  constructor(
    @InjectRepository(ManualReview)
    private readonly reviewRepo: Repository<ManualReview>,

    @InjectRepository(LoanApplication)
    private readonly loanAppRepo: Repository<LoanApplication>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findAll(): Promise<ManualReview[]> {
    return this.reviewRepo.find({
      relations: ['loan_application', 'underwriter'],
    });
  }

  async findOne(id: string): Promise<ManualReview> {
    const review = await this.reviewRepo.findOne({
      where: { id },
      relations: ['loan_application', 'underwriter'],
    });
    if (!review) {
      throw new NotFoundException(`ManualReview with id "${id}" not found`);
    }
    return review;
  }

  async create(dto: CreateManualReviewDto): Promise<ManualReview> {
    const loanApp = await this.loanAppRepo.findOneBy({
      id: dto.loanApplicationId,
    });
    if (!loanApp) {
      throw new NotFoundException(
        `LoanApplication "${dto.loanApplicationId}" not found`,
      );
    }

    let underwriter: User = null;
    if (dto.underwriterId) {
      underwriter = await this.userRepo.findOneBy({ id: dto.underwriterId });
      if (!underwriter) {
        throw new NotFoundException(
          `User (underwriter) "${dto.underwriterId}" not found`,
        );
      }
    }

    const review = this.reviewRepo.create({
      loan_application: loanApp,
      underwriter,
      review_status: dto.review_status,
      notes: dto.notes,
    });
    return this.reviewRepo.save(review);
  }

  async update(id: string, dto: UpdateManualReviewDto): Promise<ManualReview> {
    const review = await this.findOne(id);

    if (dto.underwriterId) {
      const underwriter = await this.userRepo.findOneBy({
        id: dto.underwriterId,
      });
      if (!underwriter) {
        throw new NotFoundException(
          `User (underwriter) "${dto.underwriterId}" not found`,
        );
      }
      review.underwriter = underwriter;
    }
    if (dto.review_status !== undefined) {
      review.review_status = dto.review_status;
    }
    if (dto.notes !== undefined) {
      review.notes = dto.notes;
    }

    return this.reviewRepo.save(review);
  }

  async remove(id: string): Promise<boolean> {
    const review = await this.findOne(id);
    await this.reviewRepo.remove(review);
    return true;
  }
}
