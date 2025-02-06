import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consumer } from 'src/entities/consumer.entity';
import { LoanApplication } from 'src/entities/loan-application.entity';
import { LoanOffer } from 'src/entities/loan-offer.entity';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';

import { LoanApplicationsController } from './loan-applications.controller';
import { LoanApplicationsResolver } from './loan-applications.resolver';
import { LoanApplicationsService } from './loan-applications.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LoanApplication,
      Consumer,
      Product,
      LoanOffer,
      User,
    ]),
  ],
  providers: [LoanApplicationsResolver, LoanApplicationsService],
  controllers: [LoanApplicationsController],
  exports: [LoanApplicationsService],
})
export class LoanApplicationsModule {}
