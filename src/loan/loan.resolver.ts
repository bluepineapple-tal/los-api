import { Query, Resolver } from '@nestjs/graphql';
import { Loan } from './loan.entity';

@Resolver(() => Loan)
export class LoanResolver {
  @Query(() => [Loan])
  getLoans(): Loan[] {
    return [
      { id: 1, amount: 10000, status: 'approved' },
      { id: 2, amount: 5000, status: 'pending' },
    ];
  }
}
