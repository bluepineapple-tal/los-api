import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consumer } from 'src/entities/consumer.entity';
import { LoanApplication } from 'src/entities/loan-application.entity';
import { LoanApplicationHistory } from 'src/entities/loan-application-history.entity';
import { LoanOffer } from 'src/entities/loan-offer.entity';
import { ManualReview } from 'src/entities/manual-review.entity';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';
import { Vendor } from 'src/entities/vendor.entity';

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
