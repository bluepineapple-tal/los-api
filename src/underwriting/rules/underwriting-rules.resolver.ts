import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateUnderwritingRuleInput } from './dtos/create-underwriting-rule.dto';
import { UnderwritingRuleDTO } from './dtos/underwriting-rule.dto';
import { UpdateUnderwritingRuleInput } from './dtos/update-underwriting-rule.dto';
import { UnderwritingRulesService } from './underwriting-rules.service';

@Resolver(() => UnderwritingRuleDTO)
export class UnderwritingRulesResolver {
  constructor(private readonly service: UnderwritingRulesService) {}

  @Query(() => [UnderwritingRuleDTO], { name: 'underwritingRules' })
  async findAll(): Promise<UnderwritingRuleDTO[]> {
    return this.service.findAll();
  }

  @Query(() => UnderwritingRuleDTO, { name: 'underwritingRule' })
  async findOne(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<UnderwritingRuleDTO> {
    return this.service.findOne(id);
  }

  @Mutation(() => UnderwritingRuleDTO)
  async createUnderwritingRule(
    @Args('input') input: CreateUnderwritingRuleInput,
  ): Promise<UnderwritingRuleDTO> {
    return this.service.create(input);
  }

  @Mutation(() => UnderwritingRuleDTO)
  async updateUnderwritingRule(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateUnderwritingRuleInput,
  ): Promise<UnderwritingRuleDTO> {
    return this.service.update(id, input);
  }

  @Mutation(() => Boolean)
  async removeUnderwritingRule(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.service.remove(id);
  }
}
