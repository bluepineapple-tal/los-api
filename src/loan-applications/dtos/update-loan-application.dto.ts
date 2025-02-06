import { Field, Float, InputType } from '@nestjs/graphql';
import { IsEnum, IsNumber, IsOptional, IsUUID } from 'class-validator';

import { ApplicationStatus } from '../../entities/loan-application.entity';

@InputType()
export class UpdateLoanApplicationInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  consumerId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  productId?: string;

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
