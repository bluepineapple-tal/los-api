import { registerEnumType } from '@nestjs/graphql';

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

registerEnumType(ScoreProvider, { name: 'ScoreProvider' });
registerEnumType(ScoreBand, { name: 'ScoreBand' });
