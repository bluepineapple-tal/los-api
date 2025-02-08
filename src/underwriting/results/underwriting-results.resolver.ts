import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateUnderwritingResultInput } from './dtos/create-underwriting-result.dto';
import { UnderwritingResultDTO } from './dtos/underwriting-result.dto';
import { UpdateUnderwritingResultInput } from './dtos/update-underwriting-result.dto';
import { UnderwritingResultsService } from './underwriting-results.service';

@Resolver(() => UnderwritingResultDTO)
export class UnderwritingResultsResolver {
  constructor(private readonly service: UnderwritingResultsService) {}

  @Query(() => [UnderwritingResultDTO], { name: 'underwritingResults' })
  async findAll(): Promise<UnderwritingResultDTO[]> {
    return this.service.findAll();
  }

  @Query(() => UnderwritingResultDTO, { name: 'underwritingResult' })
  async findOne(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<UnderwritingResultDTO> {
    return this.service.findOne(id);
  }

  @Mutation(() => UnderwritingResultDTO)
  async createUnderwritingResult(
    @Args('input') input: CreateUnderwritingResultInput,
  ): Promise<UnderwritingResultDTO> {
    return this.service.create(input);
  }

  @Mutation(() => UnderwritingResultDTO)
  async updateUnderwritingResult(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateUnderwritingResultInput,
  ): Promise<UnderwritingResultDTO> {
    return this.service.update(id, input);
  }

  @Mutation(() => Boolean)
  async removeUnderwritingResult(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.service.remove(id);
  }
}
