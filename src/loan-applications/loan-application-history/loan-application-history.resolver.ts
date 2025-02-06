import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateLoanApplicationHistoryInput } from './dtos/create-loan-application-history.dto';
import { LoanApplicationHistoryDTO } from './dtos/loan-application-history.dto';
import { UpdateLoanApplicationHistoryInput } from './dtos/update-loan-application-history.dto';
import { LoanApplicationHistoryService } from './loan-application-history.service';

@Resolver(() => LoanApplicationHistoryDTO)
export class LoanApplicationHistoryResolver {
  constructor(private readonly service: LoanApplicationHistoryService) {}

  @Query(() => [LoanApplicationHistoryDTO], {
    name: 'loanApplicationHistories',
  })
  async findAll(): Promise<LoanApplicationHistoryDTO[]> {
    return this.service.findAll();
  }

  @Query(() => LoanApplicationHistoryDTO, { name: 'loanApplicationHistory' })
  async findOne(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<LoanApplicationHistoryDTO> {
    return this.service.findOne(id);
  }

  @Mutation(() => LoanApplicationHistoryDTO)
  async createLoanApplicationHistory(
    @Args('input') input: CreateLoanApplicationHistoryInput,
  ): Promise<LoanApplicationHistoryDTO> {
    return this.service.create(input);
  }

  @Mutation(() => LoanApplicationHistoryDTO)
  async updateLoanApplicationHistory(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateLoanApplicationHistoryInput,
  ): Promise<LoanApplicationHistoryDTO> {
    return this.service.update(id, input);
  }

  @Mutation(() => Boolean)
  async removeLoanApplicationHistory(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.service.remove(id);
  }
}
