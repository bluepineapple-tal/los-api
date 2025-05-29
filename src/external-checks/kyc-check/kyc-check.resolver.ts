import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { KycCheckInput } from './dtos/kyc-check.dto';
import { KycCheckResponse } from './dtos/kyc-check.response';
import { KycCheckService } from './kyc-check.service';

@Resolver()
export class KycCheckResolver {
  constructor(private readonly service: KycCheckService) {}

  @Mutation(() => KycCheckResponse, { name: 'kycCheck' })
  kycCheck(@Args('input') input: KycCheckInput): KycCheckResponse {
    return this.service.verify(input);
  }
}
