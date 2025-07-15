import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';

import { CreateLoanApplicationDto } from './dtos/create-loan-application.dto';
import { UpdateLoanApplicationDto } from './dtos/update-loan-application.dto';
import { LoanApplication } from './loan-application.entity';
import { LoanApplicationsService } from './loan-applications.service';

@Controller('loan-applications')
@UseGuards(AuthGuard)
export class LoanApplicationsController {
  constructor(private readonly service: LoanApplicationsService) {}

  @Get()
  async findAll(@Req() req: Request): Promise<LoanApplication[]> {
    const session = req.session;
    const supertokensId = session.userId;
    const roles: string[] = session.userDataInAccessToken['st-role']?.v ?? [];

    return this.service.findAllForUser(roles, supertokensId);
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
