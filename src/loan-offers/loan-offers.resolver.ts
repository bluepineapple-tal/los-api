import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateLoanOfferInput } from './dtos/create-loan-offer.dto';
import { LoanOfferDTO } from './dtos/loan-offer.dto';
import { UpdateLoanOfferInput } from './dtos/update-loan-offer.dto';
import { LoanOffersService } from './loan-offers.service';

@Resolver(() => LoanOfferDTO)
export class LoanOffersResolver {
  constructor(private readonly loanOffersService: LoanOffersService) {}

  @Query(() => [LoanOfferDTO], { name: 'loanOffers' })
  async findAll(): Promise<LoanOfferDTO[]> {
    return this.loanOffersService.findAll();
  }

  @Query(() => LoanOfferDTO, { name: 'loanOffer' })
  async findOne(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<LoanOfferDTO> {
    return this.loanOffersService.findOne(id);
  }

  @Mutation(() => LoanOfferDTO)
  async createLoanOffer(
    @Args('input') input: CreateLoanOfferInput,
  ): Promise<LoanOfferDTO> {
    return this.loanOffersService.create(input);
  }

  @Mutation(() => LoanOfferDTO)
  async updateLoanOffer(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateLoanOfferInput,
  ): Promise<LoanOfferDTO> {
    return this.loanOffersService.update(id, input);
  }

  @Mutation(() => Boolean)
  async removeLoanOffer(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.loanOffersService.remove(id);
  }
}
