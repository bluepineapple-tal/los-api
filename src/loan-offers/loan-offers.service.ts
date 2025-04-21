import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../users/user.entity';
import { CreateLoanOfferDto } from './dtos/create-loan-offer.dto';
import { UpdateLoanOfferDto } from './dtos/update-loan-offer.dto';
import { LoanOffer } from './loan-offer.entity';

@Injectable()
export class LoanOffersService {
  constructor(
    @InjectRepository(LoanOffer)
    private readonly loanOfferRepo: Repository<LoanOffer>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findAll(): Promise<LoanOffer[]> {
    // If we want to load relationships: .find({ relations: 'created_by'] })
    return this.loanOfferRepo.find({
      relations: ['created_by'],
    });
  }

  async findOne(id: string): Promise<LoanOffer> {
    const offer = await this.loanOfferRepo.findOne({
      where: { id },
      relations: ['created_by'],
    });
    if (!offer) {
      throw new NotFoundException(`LoanOffer with id="${id}" not found`);
    }
    return offer;
  }

  async create(dto: CreateLoanOfferDto): Promise<LoanOffer> {
    const { createdById, valid_from, valid_to, ...rest } = dto;

    const offer = this.loanOfferRepo.create({
      ...rest,
      /* date strings ➜ Date objects */
      valid_from: new Date(valid_from),
      valid_to: new Date(valid_to),
    });

    if (createdById) {
      const creator = await this.userRepo.findOneBy({ id: createdById });
      if (!creator)
        throw new NotFoundException(`User ${createdById} not found`);
      offer.created_by = creator;
    }

    return this.loanOfferRepo.save(offer);
  }

  async update(id: string, dto: UpdateLoanOfferDto): Promise<LoanOffer> {
    const offer = await this.findOne(id);
    Object.assign(offer, {
      ...dto,
      /* cast possible date strings */
      valid_from: dto.valid_from ? new Date(dto.valid_from) : offer.valid_from,
      valid_to: dto.valid_to ? new Date(dto.valid_to) : offer.valid_to,
    });

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

  /* ==========  NEW ELIGIBILITY LOOK‑UP  ========== */

  /**
   * All active offers whose amount & date windows envelop the requested amount
   * and application date (defaults to today).
   */
  async findEligible(
    amount: number,
    onDate: Date = new Date(),
  ): Promise<LoanOffer[]> {
    return this.loanOfferRepo
      .createQueryBuilder('offer')
      .where('offer.is_active = true')
      .andWhere(':amount BETWEEN offer.min_amount AND offer.max_amount', {
        amount,
      })
      .andWhere(':date BETWEEN offer.valid_from AND offer.valid_to', {
        date: onDate,
      })
      .getMany();
  }
}
