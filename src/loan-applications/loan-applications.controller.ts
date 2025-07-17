import { Request, Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

import { CreateLoanApplicationDto } from './dtos/create-loan-application.dto';
import { LoanApplicationDTO } from './dtos/loan-application.dto';
import { UpdateLoanApplicationDto } from './dtos/update-loan-application.dto';
import { LoanApplication } from './loan-application.entity';
import { LoanApplicationsService } from './loan-applications.service';
import { LoanApplicationPdfService } from './pdf/loan-application-pdf.service';

@Controller('loan-applications')
@UseGuards(AuthGuard)
export class LoanApplicationsController {
  constructor(
    private readonly service: LoanApplicationsService,
    private readonly pdf: LoanApplicationPdfService,
  ) {}

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
  ): Promise<LoanApplicationDTO> {
    return this.service.findOne(id);
  }

  @Get(':id/pdf')
  async downloadPdf(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    // Allow only the consumer who owns the application (or admins)
    const roles: string[] =
      req.session.userDataInAccessToken['st-role']?.v ?? [];
    if (roles.includes('consumer')) {
      const app = await this.service.findOne(id);
      if (app.consumer.user.supertokensUserId !== req.session.userId)
        throw new ForbiddenException();
    }

    const buffer = await this.pdf.build(id);
    res
      .set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="loan-${id}.pdf"`,
      })
      .send(buffer);
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
