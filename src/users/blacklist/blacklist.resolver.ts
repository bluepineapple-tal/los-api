import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { BlacklistService } from './blacklist.service';
import { BlacklistDTO } from './dtos/blacklist.dto';
import { CreateBlacklistInput } from './dtos/create-blacklist.dto';
import { UpdateBlacklistInput } from './dtos/update-blacklist.dto';

@Resolver(() => BlacklistDTO)
export class BlacklistResolver {
  constructor(private readonly service: BlacklistService) {}

  @Query(() => [BlacklistDTO], { name: 'blacklists' })
  async findAll(): Promise<BlacklistDTO[]> {
    return this.service.findAll();
  }

  @Query(() => BlacklistDTO, { name: 'blacklist' })
  async findOne(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<BlacklistDTO> {
    return this.service.findOne(id);
  }

  @Mutation(() => BlacklistDTO)
  async createBlacklist(
    @Args('input') input: CreateBlacklistInput,
  ): Promise<BlacklistDTO> {
    return this.service.create(input);
  }

  @Mutation(() => BlacklistDTO)
  async updateBlacklist(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateBlacklistInput,
  ): Promise<BlacklistDTO> {
    return this.service.update(id, input);
  }

  @Mutation(() => Boolean)
  async removeBlacklist(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.service.remove(id);
  }
}
