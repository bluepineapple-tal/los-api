// src/external-checks/external-checks.resolver.ts

import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateExternalCheckInput } from './dtos/create-external-check.dto';
import { ExternalCheckDTO } from './dtos/external-check.dto';
import { UpdateExternalCheckInput } from './dtos/update-external-check.dto';
import { ExternalChecksService } from './external-checks.service';

@Resolver(() => ExternalCheckDTO)
export class ExternalChecksResolver {
  constructor(private readonly service: ExternalChecksService) {}

  @Query(() => [ExternalCheckDTO], { name: 'externalChecks' })
  async findAll(): Promise<ExternalCheckDTO[]> {
    return this.service.findAll();
  }

  @Query(() => ExternalCheckDTO, { name: 'externalCheck' })
  async findOne(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ExternalCheckDTO> {
    return this.service.findOne(id);
  }

  @Mutation(() => ExternalCheckDTO)
  async createExternalCheck(
    @Args('input') input: CreateExternalCheckInput,
  ): Promise<ExternalCheckDTO> {
    return this.service.create(input);
  }

  @Mutation(() => ExternalCheckDTO)
  async updateExternalCheck(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateExternalCheckInput,
  ): Promise<ExternalCheckDTO> {
    return this.service.update(id, input);
  }

  @Mutation(() => Boolean)
  async removeExternalCheck(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.service.remove(id);
  }
}
