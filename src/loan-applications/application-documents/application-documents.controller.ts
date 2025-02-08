import { ApplicationDocument } from 'src/loan-applications/application-documents/application-document.entity';

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

import { ApplicationDocumentsService } from './application-documents.service';
import { CreateApplicationDocumentDto } from './dtos/create-application-document.dto';
import { UpdateApplicationDocumentDto } from './dtos/update-application-document.dto';

@Controller('loan-applications/documents')
export class ApplicationDocumentsController {
  constructor(private readonly service: ApplicationDocumentsService) {}

  @Get()
  async findAll(): Promise<ApplicationDocument[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ApplicationDocument> {
    return this.service.findOne(id);
  }

  @Post()
  async create(
    @Body() dto: CreateApplicationDocumentDto,
  ): Promise<ApplicationDocument> {
    return this.service.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateApplicationDocumentDto,
  ): Promise<ApplicationDocument> {
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
