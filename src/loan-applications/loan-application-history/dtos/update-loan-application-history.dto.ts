import { IsEnum, IsOptional } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

import { ApplicationStatus } from '../../loan-application.entity';

@InputType()
export class UpdateLoanApplicationHistoryInput {
  @Field(() => ApplicationStatus, { nullable: true })
  @IsEnum(ApplicationStatus)
  @IsOptional()
  old_status?: ApplicationStatus;

  @Field(() => ApplicationStatus, { nullable: true })
  @IsEnum(ApplicationStatus)
  @IsOptional()
  new_status?: ApplicationStatus;

  @Field({ nullable: true })
  @IsOptional()
  change_note?: string;
}

export class UpdateLoanApplicationHistoryDto extends UpdateLoanApplicationHistoryInput {}
