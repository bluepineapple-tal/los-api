// src/underwriting/manual-reviews/manual-reviews.controller.ts

import { ManualReview } from 'src/underwriting/manual-reviews/manual-review.entity';

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

import { CreateManualReviewDto } from './dtos/create-manual-review.dto';
import { UpdateManualReviewDto } from './dtos/update-manual-review.dto';
import { ManualReviewsService } from './manual-reviews.service';

@Controller('underwriting/manual-reviews')
export class ManualReviewsController {
  constructor(private readonly service: ManualReviewsService) {}

  @Get()
  async findAll(): Promise<ManualReview[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ManualReview> {
    return this.service.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateManualReviewDto): Promise<ManualReview> {
    return this.service.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateManualReviewDto,
  ): Promise<ManualReview> {
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
