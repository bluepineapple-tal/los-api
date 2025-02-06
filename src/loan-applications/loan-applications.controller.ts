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

import { LoanApplication } from '../entities/loan-application.entity';
import { CreateLoanApplicationDto } from './dtos/create-loan-application.dto';
import { UpdateLoanApplicationDto } from './dtos/update-loan-application.dto';
import { LoanApplicationsService } from './loan-applications.service';

@Controller('loan-applications')
export class LoanApplicationsController {
  constructor(private readonly service: LoanApplicationsService) {}

  @Get()
  async findAll(): Promise<LoanApplication[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<LoanApplication> {
    return this.service.findOne(id);
  }

  @Post()
  async create(
    @Body() dto: CreateLoanApplicationDto,
  ): Promise<LoanApplication> {
    return this.service.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateLoanApplicationDto,
  ): Promise<LoanApplication> {
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
