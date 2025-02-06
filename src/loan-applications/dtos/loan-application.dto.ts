import {
  Field,
  Float,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { LoanOfferDTO } from 'src/loan-offers/dtos/loan-offer.dto';
import { ProductDTO } from 'src/products/dtos/product.dto';
import { ConsumerDTO } from 'src/users/dtos/consumer.dto';

import { ApplicationStatus } from '../../entities/loan-application.entity';

registerEnumType(ApplicationStatus, {
  name: 'ApplicationStatus',
});

@ObjectType()
export class LoanApplicationDTO {
  @Field(() => ID)
  id: string;

  @Field(() => ApplicationStatus)
  status: ApplicationStatus;

  @Field()
  application_date: Date;

  @Field(() => Float, { nullable: true })
  requested_amount?: number;

  @Field()
  manual_review_needed: boolean;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;

  @Field(() => LoanOfferDTO, { nullable: true })
  loan_offer?: LoanOfferDTO;

  @Field(() => ProductDTO, { nullable: true })
  product?: ProductDTO;

  @Field(() => ConsumerDTO, { nullable: true })
  consumer?: ConsumerDTO;
}
