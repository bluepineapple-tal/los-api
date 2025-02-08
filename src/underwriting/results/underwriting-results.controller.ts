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

import { CreateUnderwritingResultDto } from './dtos/create-underwriting-result.dto';
import { UpdateUnderwritingResultDto } from './dtos/update-underwriting-result.dto';
import { UnderwritingResult } from './underwriting-result.entity';
import { UnderwritingResultsService } from './underwriting-results.service';

@Controller('underwriting/results')
export class UnderwritingResultsController {
  constructor(private readonly service: UnderwritingResultsService) {}

  @Get()
  async findAll(): Promise<UnderwritingResult[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UnderwritingResult> {
    return this.service.findOne(id);
  }

  @Post()
  async create(
    @Body() dto: CreateUnderwritingResultDto,
  ): Promise<UnderwritingResult> {
    return this.service.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateUnderwritingResultDto,
  ): Promise<UnderwritingResult> {
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
