// src/external-checks/kyc-check/kyc-check.service.ts
import { Injectable } from '@nestjs/common';

import { KycScenario, SimulateKycInput } from './dtos/create-kyc-check.dto';

export interface KycMockResponse {
  response_id: string;
  request_id: string;
  timestamp: string;
  status: 'Completed';
  identity_verification: 'Verified' | 'PartiallyVerified' | 'NotVerified';
  document_verification: { passport: string; aadhar: string };
  address_verification: 'Confirmed' | 'Unconfirmed';
  risk_assessment: 'Low' | 'High';
  recommendation: 'Approved' | 'Rejected';
  comments: string;
}

@Injectable()
export class KycCheckService {
  simulate(input: SimulateKycInput): KycMockResponse {
    const { scenario, passportUrl, aadharUrl } = input;

    // helper for doc status
    const docStatus = (url: string): string => {
      if (!url) return 'NotProvided';
      switch (scenario) {
        case KycScenario.SUCCESS:
          return 'Valid';
        case KycScenario.PARTIAL:
          return 'Unclear';
        case KycScenario.FAILURE:
          return 'Invalid';
      }
    };

    // identity & other fields
    const identity = (() => {
      switch (scenario) {
        case KycScenario.SUCCESS:
          return 'Verified';
        case KycScenario.PARTIAL:
          return 'PartiallyVerified';
        case KycScenario.FAILURE:
          return 'NotVerified';
      }
    })();

    const address =
      scenario === KycScenario.SUCCESS ? 'Confirmed' : 'Unconfirmed';
    const risk = scenario === KycScenario.SUCCESS ? 'Low' : 'High';
    const rec = scenario === KycScenario.SUCCESS ? 'Approved' : 'Rejected';
    const comments = (() => {
      switch (scenario) {
        case KycScenario.SUCCESS:
          return 'All provided information is valid.';
        case KycScenario.PARTIAL:
          return 'Some documents are unclear; manual review needed.';
        case KycScenario.FAILURE:
          return 'Information mismatch with government records.';
      }
    })();

    return {
      response_id: `RES-${Date.now()}`,
      request_id: `REQ-${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: 'Completed',
      identity_verification: identity,
      document_verification: {
        passport: docStatus(passportUrl),
        aadhar: docStatus(aadharUrl),
      },
      address_verification: address,
      risk_assessment: risk,
      recommendation: rec,
      comments,
    };
  }
}
