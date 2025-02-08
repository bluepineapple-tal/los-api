import { LoanOffer } from 'src/loan-offers/loan-offer.entity';
import { Product } from 'src/products/product.entity';
import { User } from 'src/users/user.entity';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoanOffersController } from './loan-offers.controller';
import { LoanOffersResolver } from './loan-offers.resolver';
import { LoanOffersService } from './loan-offers.service';

@Module({
  imports: [TypeOrmModule.forFeature([LoanOffer, Product, User])],
  providers: [LoanOffersResolver, LoanOffersService],
  controllers: [LoanOffersController],
  exports: [LoanOffersService],
})
export class LoanOffersModule {}
