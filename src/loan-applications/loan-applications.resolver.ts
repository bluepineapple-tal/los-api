import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateLoanApplicationInput } from './dtos/create-loan-application.dto';
import { LoanApplicationDTO } from './dtos/loan-application.dto';
import { UpdateLoanApplicationInput } from './dtos/update-loan-application.dto';
import { LoanApplicationsService } from './loan-applications.service';

@Resolver(() => LoanApplicationDTO)
export class LoanApplicationsResolver {
  constructor(private readonly service: LoanApplicationsService) {}

  @Query(() => [LoanApplicationDTO], { name: 'loanApplications' })
  async findAll(): Promise<LoanApplicationDTO[]> {
    return this.service.findAll();
  }

  @Query(() => LoanApplicationDTO, { name: 'loanApplication' })
  async findOne(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<LoanApplicationDTO> {
    return this.service.findOne(id);
  }

  @Mutation(() => LoanApplicationDTO)
  async createLoanApplication(
    @Args('input') input: CreateLoanApplicationInput,
  ): Promise<LoanApplicationDTO> {
    return this.service.create(input);
  }

  @Mutation(() => LoanApplicationDTO)
  async updateLoanApplication(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateLoanApplicationInput,
  ): Promise<LoanApplicationDTO> {
    return this.service.update(id, input);
  }

  @Mutation(() => Boolean)
  async removeLoanApplication(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.service.remove(id);
  }
}
