import { registerEnumType } from '@nestjs/graphql';

export enum NatureOfBusiness {
  SALARIED = 'SALARIED',
  SELF_EMPLOYED = 'SELF_EMPLOYED',
  BUSINESS = 'BUSINESS',
  FREELANCER = 'FREELANCER',
  UNEMPLOYED = 'UNEMPLOYED',
  OTHER = 'OTHER',
}

export enum ScoreProvider {
  CIBIL = 'CIBIL',
  // EXPERIAN = 'EXPERIAN',
  // CRIF = 'CRIF',
}

export enum ScoreBand {
  POOR = 'POOR',
  FAIR = 'FAIR',
  GOOD = 'GOOD',
  VERY_GOOD = 'VERY_GOOD',
  EXCELLENT = 'EXCELLENT',
}

registerEnumType(NatureOfBusiness, { name: 'NatureOfBusiness' });
registerEnumType(ScoreProvider, { name: 'ScoreProvider' });
registerEnumType(ScoreBand, { name: 'ScoreBand' });
