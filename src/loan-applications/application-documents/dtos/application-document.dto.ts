import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

import { DocumentStatus, DocumentType } from '../application-document.entity';

registerEnumType(DocumentType, { name: 'DocumentType' });
registerEnumType(DocumentStatus, { name: 'DocumentStatus' });

@ObjectType()
export class ApplicationDocumentDTO {
  @Field(() => ID)
  id: string;

  @Field(() => DocumentType)
  doc_type: DocumentType;

  @Field()
  file_path: string;

  @Field(() => DocumentStatus)
  status: DocumentStatus;

  @Field()
  uploaded_at: Date;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}
