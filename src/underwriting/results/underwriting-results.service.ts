// src/underwriting/results/underwriting-results.service.ts

import { LoanApplication } from 'src/loan-applications/loan-application.entity';
import { UnderwritingRule } from 'src/underwriting/rules/underwriting-rule.entity';
import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUnderwritingResultDto } from './dtos/create-underwriting-result.dto';
import { UpdateUnderwritingResultDto } from './dtos/update-underwriting-result.dto';
import { UnderwritingResult } from './underwriting-result.entity';

@Injectable()
export class UnderwritingResultsService {
  constructor(
    @InjectRepository(UnderwritingResult)
    private readonly resultRepo: Repository<UnderwritingResult>,

    @InjectRepository(LoanApplication)
    private readonly loanAppRepo: Repository<LoanApplication>,

    @InjectRepository(UnderwritingRule)
    private readonly ruleRepo: Repository<UnderwritingRule>,
  ) {}

  async findAll(): Promise<UnderwritingResult[]> {
    return this.resultRepo.find({
      relations: ['loan_application', 'rule'],
    });
  }

  async findOne(id: string): Promise<UnderwritingResult> {
    const result = await this.resultRepo.findOne({
      where: { id },
      relations: ['loan_application', 'rule'],
    });
    if (!result) {
      throw new NotFoundException(
        `UnderwritingResult with id "${id}" not found`,
      );
    }
    return result;
  }

  async create(dto: CreateUnderwritingResultDto): Promise<UnderwritingResult> {
    const loanApp = await this.loanAppRepo.findOneBy({
      id: dto.loanApplicationId,
    });
    if (!loanApp) {
      throw new NotFoundException(
        `LoanApplication "${dto.loanApplicationId}" not found`,
      );
    }

    const rule = await this.ruleRepo.findOneBy({ id: dto.ruleId });
    if (!rule) {
      throw new NotFoundException(`UnderwritingRule "${dto.ruleId}" not found`);
    }

    const result = this.resultRepo.create({
      loan_application: loanApp,
      rule,
      decision: dto.decision,
      reason: dto.reason,
    });
    return this.resultRepo.save(result);
  }

  async update(
    id: string,
    dto: UpdateUnderwritingResultDto,
  ): Promise<UnderwritingResult> {
    const result = await this.findOne(id);

    if (dto.ruleId) {
      const rule = await this.ruleRepo.findOneBy({ id: dto.ruleId });
      if (!rule) {
        throw new NotFoundException(
          `UnderwritingRule "${dto.ruleId}" not found`,
        );
      }
      result.rule = rule;
    }
    if (dto.decision !== undefined) {
      result.decision = dto.decision;
    }
    if (dto.reason !== undefined) {
      result.reason = dto.reason;
    }
    return this.resultRepo.save(result);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.findOne(id);
    await this.resultRepo.remove(result);
    return true;
  }
}
