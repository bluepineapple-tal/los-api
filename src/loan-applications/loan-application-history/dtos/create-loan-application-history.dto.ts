import { IsEnum, IsOptional, IsUUID } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

import { ApplicationStatus } from '../../../entities/loan-application.entity';

@InputType()
export class CreateLoanApplicationHistoryInput {
  @Field()
  @IsUUID()
  loanApplicationId: string;

  @Field(() => ApplicationStatus)
  @IsEnum(ApplicationStatus)
  old_status: ApplicationStatus;

  @Field(() => ApplicationStatus)
  @IsEnum(ApplicationStatus)
  new_status: ApplicationStatus;

  @Field({ nullable: true })
  @IsOptional()
  change_note?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  changed_by?: string; // user ID
}

export class CreateLoanApplicationHistoryDto extends CreateLoanApplicationHistoryInput {}
