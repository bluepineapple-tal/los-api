import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { SimulateKycInput } from './dtos/create-kyc-check.dto';
import { KycCheckService, KycMockResponse } from './kyc-check.service';

@Resolver()
export class KycCheckResolver {
  constructor(private readonly svc: KycCheckService) {}

  @Mutation(() => String, { name: 'runKycCheck' })
  async runKycCheck(
    @Args('input') input: SimulateKycInput,
  ): Promise<KycMockResponse> {
    const res = this.svc.simulate(input);
    return res;
  }
}
