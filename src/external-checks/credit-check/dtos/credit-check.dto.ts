import { IsNumber, IsEnum, Max, Min } from 'class-validator';

export enum CreditHistory {
  GOOD = 'GOOD',
  FAIR = 'FAIR',
  POOR = 'POOR',
}

export enum NatureOfBusiness {
  SALARIED = 'SALARIED',
  SELF_EMPLOYED = 'SELF_EMPLOYED',
  FREELANCER = 'FREELANCER',
  UNEMPLOYED = 'UNEMPLOYED',
}

export enum ResidenceType {
  RENTED = 'RENTED',
  OWN = 'OWN',
}

export class CreditCheckDto {
  @IsNumber()
  @Min(0)
  income: number;

  @IsEnum(CreditHistory)
  creditHistory: CreditHistory;

  @IsEnum(NatureOfBusiness)
  natureOfBusiness: NatureOfBusiness;

  @IsEnum(ResidenceType)
  residenceType: ResidenceType;

  @IsNumber()
  @Min(18)
  @Max(100)
  age: number;
}
