import { User } from 'src/entities/user.entity';
import { LoanApplicationHistory } from 'src/loan-applications/loan-application-history/loan-application-history.entity';
import { LoanApplication } from 'src/loan-applications/loan-application.entity';
import { LoanOffer } from 'src/loan-offers/loan-offer.entity';
import { Product } from 'src/products/product.entity';
import { ManualReview } from 'src/underwriting/manual-reviews/manual-review.entity';
import { Consumer } from 'src/users/consumer.entity';
import { Vendor } from 'src/users/vendor.entity';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Vendor,
      Consumer,
      LoanApplication,
      LoanOffer,
      Product,
      ManualReview,
      LoanApplicationHistory,
    ]),
  ],
  providers: [UsersResolver, UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
