import { registerEnumType } from '@nestjs/graphql';

export enum KycStatus {
  SUCCESS = 'SUCCESS',
  PARTIAL = 'PARTIAL',
  FAILED = 'FAILED',
}

export enum VerificationOutcome {
  VERIFIED = 'VERIFIED',
  DOCUMENTS_NOT_CLEAR = 'DOCUMENTS_NOT_CLEAR',
  NO_MATCH = 'NO_MATCH',
}

registerEnumType(KycStatus, { name: 'KycStatus' });
registerEnumType(VerificationOutcome, { name: 'VerificationOutcome' });
