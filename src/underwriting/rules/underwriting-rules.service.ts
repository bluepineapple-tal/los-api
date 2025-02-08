// src/underwriting/rules/underwriting-rules.service.ts

import { UnderwritingRule } from 'src/underwriting/rules/underwriting-rule.entity';
import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUnderwritingRuleDto } from './dtos/create-underwriting-rule.dto';
import { UpdateUnderwritingRuleDto } from './dtos/update-underwriting-rule.dto';

@Injectable()
export class UnderwritingRulesService {
  constructor(
    @InjectRepository(UnderwritingRule)
    private readonly ruleRepo: Repository<UnderwritingRule>,
  ) {}

  async findAll(): Promise<UnderwritingRule[]> {
    return this.ruleRepo.find();
  }

  async findOne(id: string): Promise<UnderwritingRule> {
    const rule = await this.ruleRepo.findOneBy({ id });
    if (!rule) {
      throw new NotFoundException(`Rule with id "${id}" not found`);
    }
    return rule;
  }

  async create(dto: CreateUnderwritingRuleDto): Promise<UnderwritingRule> {
    const rule = this.ruleRepo.create(dto);
    return this.ruleRepo.save(rule);
  }

  async update(
    id: string,
    dto: UpdateUnderwritingRuleDto,
  ): Promise<UnderwritingRule> {
    const rule = await this.findOne(id);

    if (dto.rule_name !== undefined) rule.rule_name = dto.rule_name;
    if (dto.rule_desc !== undefined) rule.rule_desc = dto.rule_desc;
    if (dto.conditions !== undefined) rule.conditions = dto.conditions;
    if (dto.action !== undefined) rule.action = dto.action;
    if (dto.priority !== undefined) rule.priority = dto.priority;
    if (dto.active !== undefined) rule.active = dto.active;

    return this.ruleRepo.save(rule);
  }

  async remove(id: string): Promise<boolean> {
    const rule = await this.findOne(id);
    await this.ruleRepo.remove(rule);
    return true;
  }
}
