import { LoanApplicationHistory } from 'src/entities/loan-application-history.entity';

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

import { CreateLoanApplicationHistoryDto } from './dtos/create-loan-application-history.dto';
import { UpdateLoanApplicationHistoryDto } from './dtos/update-loan-application-history.dto';
import { LoanApplicationHistoryService } from './loan-application-history.service';

@Controller('loan-applications/history')
export class LoanApplicationHistoryController {
  constructor(private readonly service: LoanApplicationHistoryService) {}

  @Get()
  async findAll(): Promise<LoanApplicationHistory[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<LoanApplicationHistory> {
    return this.service.findOne(id);
  }

  @Post()
  async create(
    @Body() dto: CreateLoanApplicationHistoryDto,
  ): Promise<LoanApplicationHistory> {
    return this.service.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateLoanApplicationHistoryDto,
  ): Promise<LoanApplicationHistory> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<{ success: boolean }> {
    const success = await this.service.remove(id);
    return { success };
  }
}
