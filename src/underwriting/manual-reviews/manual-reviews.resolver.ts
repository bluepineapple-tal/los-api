import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateManualReviewInput } from './dtos/create-manual-review.dto';
import { ManualReviewDTO } from './dtos/manual-review.dto';
import { UpdateManualReviewInput } from './dtos/update-manual-review.dto';
import { ManualReviewsService } from './manual-reviews.service';

@Resolver(() => ManualReviewDTO)
export class ManualReviewsResolver {
  constructor(private readonly service: ManualReviewsService) {}

  @Query(() => [ManualReviewDTO], { name: 'manualReviews' })
  async findAll(): Promise<ManualReviewDTO[]> {
    return this.service.findAll();
  }

  @Query(() => ManualReviewDTO, { name: 'manualReview' })
  async findOne(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ManualReviewDTO> {
    return this.service.findOne(id);
  }

  @Mutation(() => ManualReviewDTO)
  async createManualReview(
    @Args('input') input: CreateManualReviewInput,
  ): Promise<ManualReviewDTO> {
    return this.service.create(input);
  }

  @Mutation(() => ManualReviewDTO)
  async updateManualReview(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateManualReviewInput,
  ): Promise<ManualReviewDTO> {
    return this.service.update(id, input);
  }

  @Mutation(() => Boolean)
  async removeManualReview(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.service.remove(id);
  }
}
