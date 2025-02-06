import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ApplicationDocumentsService } from './application-documents.service';
import { ApplicationDocumentDTO } from './dtos/application-document.dto';
import { CreateApplicationDocumentInput } from './dtos/create-application-document.dto';
import { UpdateApplicationDocumentInput } from './dtos/update-application-document.dto';

@Resolver(() => ApplicationDocumentDTO)
export class ApplicationDocumentsResolver {
  constructor(private readonly service: ApplicationDocumentsService) {}

  @Query(() => [ApplicationDocumentDTO], { name: 'applicationDocuments' })
  async findAll(): Promise<ApplicationDocumentDTO[]> {
    return this.service.findAll();
  }

  @Query(() => ApplicationDocumentDTO, { name: 'applicationDocument' })
  async findOne(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ApplicationDocumentDTO> {
    return this.service.findOne(id);
  }

  @Mutation(() => ApplicationDocumentDTO)
  async createApplicationDocument(
    @Args('input') input: CreateApplicationDocumentInput,
  ): Promise<ApplicationDocumentDTO> {
    return this.service.create(input);
  }

  @Mutation(() => ApplicationDocumentDTO)
  async updateApplicationDocument(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateApplicationDocumentInput,
  ): Promise<ApplicationDocumentDTO> {
    return this.service.update(id, input);
  }

  @Mutation(() => Boolean)
  async removeApplicationDocument(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.service.remove(id);
  }
}
