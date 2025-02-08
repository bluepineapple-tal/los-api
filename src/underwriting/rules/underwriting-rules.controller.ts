import { UnderwritingRule } from 'src/underwriting/rules/underwriting-rule.entity';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';

import { CreateUnderwritingRuleDto } from './dtos/create-underwriting-rule.dto';
import { UpdateUnderwritingRuleDto } from './dtos/update-underwriting-rule.dto';
import { UnderwritingRulesService } from './underwriting-rules.service';

@Controller('underwriting/rules')
export class UnderwritingRulesController {
  constructor(private readonly service: UnderwritingRulesService) {}

  @Get()
  async findAll(): Promise<UnderwritingRule[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UnderwritingRule> {
    return this.service.findOne(id);
  }

  @Post()
  async create(
    @Body() dto: CreateUnderwritingRuleDto,
  ): Promise<UnderwritingRule> {
    return this.service.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateUnderwritingRuleDto,
  ): Promise<UnderwritingRule> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const success = await this.service.remove(id);
    return { success };
  }
}
