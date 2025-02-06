import { Consumer } from 'src/entities/consumer.entity';
import { User } from 'src/entities/user.entity';
import { Vendor } from 'src/entities/vendor.entity';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { LoanApplication } from 'src/entities/loan-application.entity';
import { Product } from 'src/entities/product.entity';
import { LoanOffer } from 'src/entities/loan-offer.entity';
import { ManualReview } from 'src/entities/manual-review.entity';
import { LoanApplicationHistory } from 'src/entities/loan-application-history.entity';

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
