import { Blacklist } from 'src/users/blacklist/blacklist.entity';
import { LoanApplicationHistory } from 'src/loan-applications/loan-application-history/loan-application-history.entity';
import { LoanApplication } from 'src/loan-applications/loan-application.entity';
import { LoanOffer } from 'src/loan-offers/loan-offer.entity';

import { ManualReview } from 'src/underwriting/manual-reviews/manual-review.entity';
import { ConsumerDetails } from 'src/users/consumer.entity';
import { VendorDetails } from 'src/users/vendor.entity';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BlacklistController } from './blacklist/blacklist.controller';
import { BlacklistResolver } from './blacklist/blacklist.resolver';
import { BlacklistService } from './blacklist/blacklist.service';
import { UsersController } from './users.controller';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Blacklist,
      ConsumerDetails,
      LoanApplication,
      LoanApplicationHistory,
      LoanOffer,
      ManualReview,
      User,
      VendorDetails,
    ]),
  ],
  providers: [BlacklistResolver, BlacklistService, UsersResolver, UsersService],
  controllers: [BlacklistController, UsersController],
  exports: [UsersService],
})
export class UsersModule {}
