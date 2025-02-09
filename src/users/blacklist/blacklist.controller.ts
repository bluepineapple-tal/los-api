import { Blacklist } from 'src/entities/blacklist.entity';

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

import { BlacklistService } from './blacklist.service';
import { CreateBlacklistDto } from './dtos/create-blacklist.dto';
import { UpdateBlacklistDto } from './dtos/update-blacklist.dto';

@Controller('blacklist')
export class BlacklistController {
  constructor(private readonly service: BlacklistService) {}

  @Get()
  async findAll(): Promise<Blacklist[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Blacklist> {
    return this.service.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateBlacklistDto): Promise<Blacklist> {
    return this.service.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateBlacklistDto,
  ): Promise<Blacklist> {
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
