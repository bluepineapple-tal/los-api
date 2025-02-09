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

import { CreateExternalCheckDto } from './dtos/create-external-check.dto';
import { UpdateExternalCheckDto } from './dtos/update-external-check.dto';
import { ExternalCheck } from './external-check.entity';
import { ExternalChecksService } from './external-checks.service';

@Controller('external-checks')
export class ExternalChecksController {
  constructor(private readonly service: ExternalChecksService) {}

  @Get()
  async findAll(): Promise<ExternalCheck[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ExternalCheck> {
    return this.service.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateExternalCheckDto): Promise<ExternalCheck> {
    return this.service.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateExternalCheckDto,
  ): Promise<ExternalCheck> {
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
