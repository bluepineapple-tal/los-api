import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateLoanApplicationHistoryInput } from './dtos/create-loan-application-history.dto';
import { LoanApplicationHistoryDTO } from './dtos/loan-application-history.dto';
import { UpdateLoanApplicationHistoryInput } from './dtos/update-loan-application-history.dto';
import { LoanApplicationHistoryService } from './loan-application-history.service';
import { LoanApplicationHistory } from './loan-application-history.entity';

@Resolver(() => LoanApplicationHistoryDTO)
export class LoanApplicationHistoryResolver {
  constructor(private readonly service: LoanApplicationHistoryService) {}

  @Query(() => [LoanApplicationHistoryDTO], {
    name: 'loanApplicationHistories',
  })
  async findAll(): Promise<LoanApplicationHistory[]> {
    return this.service.findAll();
  }

  @Query(() => LoanApplicationHistoryDTO, { name: 'loanApplicationHistory' })
  async findOne(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<LoanApplicationHistory> {
    return this.service.findOne(id);
  }

  @Mutation(() => LoanApplicationHistoryDTO)
  async createLoanApplicationHistory(
    @Args('input') input: CreateLoanApplicationHistoryInput,
  ): Promise<LoanApplicationHistory> {
    return this.service.create(input);
  }

  @Mutation(() => LoanApplicationHistoryDTO)
  async updateLoanApplicationHistory(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateLoanApplicationHistoryInput,
  ): Promise<LoanApplicationHistory> {
    return this.service.update(id, input);
  }

  @Mutation(() => Boolean)
  async removeLoanApplicationHistory(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.service.remove(id);
  }
}
