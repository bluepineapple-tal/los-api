import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsUUID,
  Min,
} from 'class-validator';

import { Field, Float, InputType } from '@nestjs/graphql';

import { ApplicationStatus } from '../loan-application.entity';
import { SourceOfIncome } from 'src/users/user.enums';

@InputType()
export class CreateLoanApplicationInput {
  @Field()
  @IsUUID()
  consumerId: string;

  /* income */
  @Field()
  @Min(0)
  monthly_income: number;

  @Field(() => SourceOfIncome)
  @IsEnum(SourceOfIncome)
  source_of_income: SourceOfIncome;

  @Field()
  @IsUUID()
  productCategoryId: string;

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
