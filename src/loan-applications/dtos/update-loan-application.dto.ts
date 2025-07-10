import { IsEnum, IsNumber, IsOptional, IsUUID } from 'class-validator';

import { Field, Float, InputType } from '@nestjs/graphql';

import { ApplicationStatus } from '../loan-application.entity';
import { SourceOfIncome } from 'src/users/user.enums';

@InputType()
export class UpdateLoanApplicationInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  consumerId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  monthly_income?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(SourceOfIncome)
  source_of_income?: SourceOfIncome;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  productCategoryId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  loanOfferId?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  requested_amount?: number;

  @Field(() => ApplicationStatus, { nullable: true })
  @IsOptional()
  @IsEnum(ApplicationStatus)
  status?: ApplicationStatus;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  underwriterId?: string;

  // If we allow toggling manual_review_needed from here:
  @Field({ nullable: true })
  @IsOptional()
  manual_review_needed?: boolean;
}

export class UpdateLoanApplicationDto extends UpdateLoanApplicationInput {}
