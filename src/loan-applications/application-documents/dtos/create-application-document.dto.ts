import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

import { DocumentType } from '../../../entities/application-document.entity';

@InputType()
export class CreateApplicationDocumentInput {
  @Field()
  @IsUUID()
  loanApplicationId: string; // reference the loan application

  @Field(() => DocumentType)
  @IsEnum(DocumentType)
  doc_type: DocumentType;

  @Field()
  @IsNotEmpty()
  file_path: string;
}

export class CreateApplicationDocumentDto extends CreateApplicationDocumentInput {}
