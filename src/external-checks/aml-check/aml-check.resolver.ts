import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AmlCheckService } from './aml-check.service';
import { AmlCheckInput } from './dtos/aml-check.dto';
import { AmlCheckResponse } from './dtos/aml-check.response';

@Resolver()
export class AmlCheckResolver {
  constructor(private readonly service: AmlCheckService) {}

  @Mutation(() => AmlCheckResponse, { name: 'amlCheck' })
  amlCheck(@Args('input') input: AmlCheckInput): AmlCheckResponse {
    return this.service.amlCheck(input);
  }
}
