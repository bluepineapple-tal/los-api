import { randomUUID } from 'node:crypto';

import { Injectable } from '@nestjs/common';

import { KycCheckInput } from './dtos/kyc-check.dto';
import { KycCheckResponse } from './dtos/kyc-check.response';
import { KycStatus, VerificationOutcome } from './kyc-check.enums';

@Injectable()
export class KycCheckService {
  /** Aadhaar numbers driving deterministic outcomes  */
  private readonly partialAadhaars = new Set(['222222222222', '333333333333']);
  private readonly failedAadhaars = new Set(['444444444444', '555555555555']);

  verify(input: KycCheckInput): KycCheckResponse {
    const { aadhaar_number } = input;

    // ------------- FAILED -----------------
    if (this.failedAadhaars.has(aadhaar_number)) {
      return this.buildResponse({
        status: KycStatus.FAILED,
        verification_status: VerificationOutcome.NO_MATCH,
        message: 'Provided details do not match government records.',
        fields_incorrect: ['aadhaar_number', 'PAN'],
      });
    }

    // ------------- PARTIAL ----------------
    if (this.partialAadhaars.has(aadhaar_number)) {
      return this.buildResponse({
        status: KycStatus.PARTIAL,
        verification_status: VerificationOutcome.DOCUMENTS_NOT_CLEAR,
        message: 'Document images are unclear. Please re-upload.',
        fields_incorrect: ['aadhar_document', 'pan_document'],
      });
    }

    // ------------- SUCCESS ---------------
    return this.buildResponse({
      status: KycStatus.SUCCESS,
      verification_status: VerificationOutcome.VERIFIED,
      message: 'KYC verification successful.',
    });
  }

  // ---------- helpers ----------
  private buildResponse(
    overrides: Partial<KycCheckResponse>,
  ): KycCheckResponse {
    return {
      status: overrides.status,
      verification_status: overrides.verification_status,
      message: overrides.message,
      fields_incorrect: overrides.fields_incorrect,
      request_id: randomUUID(),
      timestamp: new Date().toISOString(),
    };
  }
}
