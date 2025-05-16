import { registerEnumType } from '@nestjs/graphql';

export enum Status {
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}

export enum RiskCategory {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export enum ActionRequired {
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
  REVIEW_REQUIRED = 'REVIEW_REQUIRED',
}

export enum SanctionListMatch {
  NONE = 'NONE',
  SEBI_INSIDER_TRADING_WATCHLIST = 'SEBI Insider Trading Watchlist',
  RBI_DEFAULTERS_LIST = 'RBI Defaulters List',
}

registerEnumType(Status, { name: 'Status' });
registerEnumType(RiskCategory, { name: 'RiskCategory' });
registerEnumType(ActionRequired, { name: 'ActionRequired' });
registerEnumType(SanctionListMatch, { name: 'SanctionListMatch' });
