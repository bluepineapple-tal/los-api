import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CreditCheckService } from './credit-check.service';
import { CreditCheckInput } from './dtos/credit-check.dto';
import { CreditCheckResponse } from './dtos/credit-check.response';

@Resolver()
export class CreditCheckResolver {
  constructor(private readonly service: CreditCheckService) {}

  @Mutation(() => CreditCheckResponse, { name: 'creditCheck' })
  async creditCheck(
    @Args('input') input: CreditCheckInput,
  ): Promise<CreditCheckResponse> {
    return await this.service.generateScore(input);
  }
}
