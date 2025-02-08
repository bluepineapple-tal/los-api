import { ApplicationDocument } from 'src/loan-applications/application-documents/application-document.entity';
import { LoanApplicationHistory } from 'src/loan-applications/loan-application-history/loan-application-history.entity';
import { LoanApplication } from 'src/loan-applications/loan-application.entity';
import { LoanOffer } from 'src/loan-offers/loan-offer.entity';
import { Product } from 'src/products/product.entity';
import { Consumer } from 'src/users/consumer.entity';
import { User } from 'src/users/user.entity';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApplicationDocumentsController } from './application-documents/application-documents.controller';
import { ApplicationDocumentsResolver } from './application-documents/application-documents.resolver';
import { ApplicationDocumentsService } from './application-documents/application-documents.service';
import { LoanApplicationHistoryController } from './loan-application-history/loan-application-history.controller';
import { LoanApplicationHistoryResolver } from './loan-application-history/loan-application-history.resolver';
import { LoanApplicationHistoryService } from './loan-application-history/loan-application-history.service';
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
      ApplicationDocument,
      LoanApplicationHistory,
    ]),
  ],
  providers: [
    LoanApplicationsResolver,
    LoanApplicationsService,
    ApplicationDocumentsService,
    ApplicationDocumentsResolver,
    LoanApplicationHistoryService,
    LoanApplicationHistoryResolver,
  ],
  controllers: [
    LoanApplicationsController,
    ApplicationDocumentsController,
    LoanApplicationHistoryController,
  ],
  exports: [LoanApplicationsService],
})
export class LoanApplicationsModule {}
