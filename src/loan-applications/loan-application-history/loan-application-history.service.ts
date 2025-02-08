import { LoanApplicationHistory } from 'src/loan-applications/loan-application-history/loan-application-history.entity';
import { LoanApplication } from 'src/loan-applications/loan-application.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateLoanApplicationHistoryDto } from './dtos/create-loan-application-history.dto';
import { UpdateLoanApplicationHistoryDto } from './dtos/update-loan-application-history.dto';

@Injectable()
export class LoanApplicationHistoryService {
  constructor(
    @InjectRepository(LoanApplicationHistory)
    private readonly historyRepo: Repository<LoanApplicationHistory>,

    @InjectRepository(LoanApplication)
    private readonly loanAppRepo: Repository<LoanApplication>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findAll(): Promise<LoanApplicationHistory[]> {
    return this.historyRepo.find({
      relations: ['loan_application', 'changed_by'],
    });
  }

  async findOne(id: string): Promise<LoanApplicationHistory> {
    const record = await this.historyRepo.findOne({
      where: { id },
      relations: ['loan_application', 'changed_by'],
    });
    if (!record) {
      throw new NotFoundException(`History record "${id}" not found`);
    }
    return record;
  }

  async create(
    dto: CreateLoanApplicationHistoryDto,
  ): Promise<LoanApplicationHistory> {
    const loanApp = await this.loanAppRepo.findOneBy({
      id: dto.loanApplicationId,
    });
    if (!loanApp) {
      throw new NotFoundException(
        `LoanApplication "${dto.loanApplicationId}" not found`,
      );
    }

    let changedByUser: User = null;
    if (dto.changed_by) {
      changedByUser = await this.userRepo.findOneBy({ id: dto.changed_by });
      if (!changedByUser) {
        throw new NotFoundException(`User "${dto.changed_by}" not found`);
      }
    }

    const record = this.historyRepo.create({
      loan_application: loanApp,
      old_status: dto.old_status,
      new_status: dto.new_status,
      change_note: dto.change_note,
      changed_by: changedByUser || null,
      changed_at: new Date(),
    });

    return this.historyRepo.save(record);
  }

  async update(
    id: string,
    dto: UpdateLoanApplicationHistoryDto,
  ): Promise<LoanApplicationHistory> {
    const record = await this.findOne(id);

    if (dto.old_status !== undefined) {
      record.old_status = dto.old_status;
    }
    if (dto.new_status !== undefined) {
      record.new_status = dto.new_status;
    }
    if (dto.change_note !== undefined) {
      record.change_note = dto.change_note;
    }

    return this.historyRepo.save(record);
  }

  async remove(id: string): Promise<boolean> {
    const record = await this.findOne(id);
    await this.historyRepo.remove(record);
    return true;
  }
}
