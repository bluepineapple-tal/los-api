// src/external-checks/kyc-check/dtos/simulate-kyc.dto.ts
import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsString } from 'class-validator';

export enum KycScenario {
  SUCCESS = 'SUCCESS',
  PARTIAL = 'PARTIAL',
  FAILURE = 'FAILURE',
}

@InputType()
export class SimulateKycInput {
  @Field() @IsString() passportUrl: string;
  @Field() @IsString() aadharUrl: string;
  @Field() @IsEnum(KycScenario) scenario: KycScenario;
}
