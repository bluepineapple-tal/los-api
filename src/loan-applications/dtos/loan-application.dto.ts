import { LoanOfferDTO } from 'src/loan-offers/dtos/loan-offer.dto';
import { ProductCategoryDto } from 'src/products/product-categories/dtos/product-category.dto';
import { ConsumerDTO } from 'src/users/dtos/consumer.dto';
import { UserDTO } from 'src/users/dtos/user.dto';

import {
  Field,
  Float,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

import { ApplicationStatus } from '../loan-application.entity';

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
  selectedOffer?: LoanOfferDTO;

  @Field(() => ProductCategoryDto)
  productCategory: ProductCategoryDto;

  @Field(() => ConsumerDTO)
  consumer: ConsumerDTO;

  @Field(() => UserDTO, { nullable: true })
  underwriter?: UserDTO;
}
