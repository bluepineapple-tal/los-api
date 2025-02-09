// src/external-checks/external-checks.service.ts

import { LoanApplication } from 'src/loan-applications/loan-application.entity';
import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateExternalCheckDto } from './dtos/create-external-check.dto';
import { UpdateExternalCheckDto } from './dtos/update-external-check.dto';
import { ExternalCheck } from './external-check.entity';

@Injectable()
export class ExternalChecksService {
  constructor(
    @InjectRepository(ExternalCheck)
    private readonly externalCheckRepo: Repository<ExternalCheck>,

    @InjectRepository(LoanApplication)
    private readonly loanAppRepo: Repository<LoanApplication>,
  ) {}

  async findAll(): Promise<ExternalCheck[]> {
    return this.externalCheckRepo.find({
      relations: ['loan_application'],
    });
  }

  async findOne(id: string): Promise<ExternalCheck> {
    const record = await this.externalCheckRepo.findOne({
      where: { id },
      relations: ['loan_application'],
    });
    if (!record) {
      throw new NotFoundException(`ExternalCheck with id "${id}" not found`);
    }
    return record;
  }

  async create(dto: CreateExternalCheckDto): Promise<ExternalCheck> {
    // Validate the Loan Application
    const loanApp = await this.loanAppRepo.findOneBy({
      id: dto.loanApplicationId,
    });
    if (!loanApp) {
      throw new NotFoundException(
        `Loan Application "${dto.loanApplicationId}" not found`,
      );
    }

    const check = this.externalCheckRepo.create({
      loan_application: loanApp,
      check_type: dto.check_type,
      check_status: dto.check_status,
      response_data: dto.response_data,
      // requested_at is auto set by CreateDateColumn
    });

    return this.externalCheckRepo.save(check);
  }

  async update(
    id: string,
    dto: UpdateExternalCheckDto,
  ): Promise<ExternalCheck> {
    const check = await this.findOne(id);

    if (dto.check_type !== undefined) {
      check.check_type = dto.check_type;
    }
    if (dto.check_status !== undefined) {
      check.check_status = dto.check_status;
    }
    if (dto.response_data !== undefined) {
      check.response_data = dto.response_data;
    }
    if (dto.responded_at !== undefined) {
      check.responded_at = new Date(dto.responded_at);
    }

    return this.externalCheckRepo.save(check);
  }

  async remove(id: string): Promise<boolean> {
    const check = await this.findOne(id);
    await this.externalCheckRepo.remove(check);
    return true;
  }
}
