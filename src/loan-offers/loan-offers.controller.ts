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

import { LoanOffer } from '../entities/loan-offer.entity';
import { CreateLoanOfferDto } from './dtos/create-loan-offer.dto';
import { UpdateLoanOfferDto } from './dtos/update-loan-offer.dto';
import { LoanOffersService } from './loan-offers.service';

@Controller('loan-offers')
export class LoanOffersController {
  constructor(private readonly loanOffersService: LoanOffersService) {}

  @Get()
  async findAll(): Promise<LoanOffer[]> {
    return this.loanOffersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<LoanOffer> {
    return this.loanOffersService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateLoanOfferDto): Promise<LoanOffer> {
    return this.loanOffersService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateLoanOfferDto,
  ): Promise<LoanOffer> {
    return this.loanOffersService.update(id, dto);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<{ success: boolean }> {
    const success = await this.loanOffersService.remove(id);
    return { success };
  }
}
