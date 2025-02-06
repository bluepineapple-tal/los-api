import { ApplicationDocument } from 'src/entities/application-document.entity';
import { LoanApplication } from 'src/entities/loan-application.entity';
import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateApplicationDocumentDto } from './dtos/create-application-document.dto';
import { UpdateApplicationDocumentDto } from './dtos/update-application-document.dto';

@Injectable()
export class ApplicationDocumentsService {
  constructor(
    @InjectRepository(ApplicationDocument)
    private readonly docRepository: Repository<ApplicationDocument>,

    @InjectRepository(LoanApplication)
    private readonly loanAppRepository: Repository<LoanApplication>,
  ) {}

  async findAll(): Promise<ApplicationDocument[]> {
    return this.docRepository.find({
      relations: ['loan_application'],
    });
  }

  async findOne(id: string): Promise<ApplicationDocument> {
    const doc = await this.docRepository.findOne({
      where: { id },
      relations: ['loan_application'],
    });
    if (!doc) {
      throw new NotFoundException(`Document with id "${id}" not found`);
    }
    return doc;
  }

  async create(
    dto: CreateApplicationDocumentDto,
  ): Promise<ApplicationDocument> {
    const loanApp = await this.loanAppRepository.findOneBy({
      id: dto.loanApplicationId,
    });
    if (!loanApp) {
      throw new NotFoundException(
        `LoanApplication with id "${dto.loanApplicationId}" not found`,
      );
    }

    const doc = this.docRepository.create({
      loan_application: loanApp,
      doc_type: dto.doc_type,
      file_path: dto.file_path,
    });
    return this.docRepository.save(doc);
  }

  async update(
    id: string,
    dto: UpdateApplicationDocumentDto,
  ): Promise<ApplicationDocument> {
    const doc = await this.findOne(id);

    if (dto.file_path !== undefined) {
      doc.file_path = dto.file_path;
    }
    if (dto.doc_type !== undefined) {
      doc.doc_type = dto.doc_type;
    }
    if (dto.status !== undefined) {
      doc.status = dto.status;
    }

    return this.docRepository.save(doc);
  }

  async remove(id: string): Promise<boolean> {
    const doc = await this.findOne(id);
    await this.docRepository.remove(doc);
    return true;
  }
}
