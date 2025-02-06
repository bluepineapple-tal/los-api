import { IsEnum, IsOptional } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

import {
  DocumentStatus,
  DocumentType,
} from '../../../entities/application-document.entity';

@InputType()
export class UpdateApplicationDocumentInput {
  @Field({ nullable: true })
  @IsOptional()
  file_path?: string;

  @Field(() => DocumentType, { nullable: true })
  @IsEnum(DocumentType)
  @IsOptional()
  doc_type?: DocumentType;

  @Field(() => DocumentStatus, { nullable: true })
  @IsEnum(DocumentStatus)
  @IsOptional()
  status?: DocumentStatus;
}

export class UpdateApplicationDocumentDto extends UpdateApplicationDocumentInput {}
