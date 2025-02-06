import { Field, Float, InputType } from '@nestjs/graphql';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';

import { ApplicationStatus } from '../../entities/loan-application.entity';

@InputType()
export class CreateLoanApplicationInput {
  @Field()
  @IsUUID()
  consumerId: string;

  @Field()
  @IsUUID()
  productId: string;

  @Field()
  @IsUUID()
  loanOfferId: string;

  @Field({ nullable: true })
  @IsDateString()
  application_date?: string; // If not provided, set it in service

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  requested_amount?: number;

  @Field(() => ApplicationStatus, { defaultValue: ApplicationStatus.DRAFT })
  @IsEnum(ApplicationStatus)
  status?: ApplicationStatus;

  @Field({ nullable: true })
  @IsUUID()
  @IsOptional()
  underwriterId?: string;
}

export class CreateLoanApplicationDto extends CreateLoanApplicationInput {}
