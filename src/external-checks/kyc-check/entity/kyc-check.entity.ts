import { IsEnum } from "class-validator";
import { UUID } from "crypto";




export enum Status{
    COMPLETED = 'completed',
    FAILED= 'failed',
    UNKOWN='unknown'
}

export enum Verification{
    VERIFIED='verified',
    UNVERIFIEDd='unverified',
    VALID='valid',
    INVALID='invalid',
    CONFIRMED='confirmed',
    UNCONFIRMED='unconfirmed'

}

export enum Recc{
    APPROVED='approved',
    UNAPPROVED='unapproved',
    MANUAL='Manual review required',
    RESUBMIT='Resubmit valid address proof',
    RETRY='Retry with complete information or escalate to compliance team'
}

export enum RiskAssessment {
LOW='low',
MEDIUM='medium',
HIGH='high'
}


export class KycCheckResponse{
    response_id: UUID;
    request_id: string;
    timestamp: string;
    @IsEnum(Status) status: Status;
    @IsEnum(Verification) identity_verification: Verification;
    document_verification: any;
    address_verification: string;
    risk_assessment: string;
    recommendation: string;
    comments: string;
    reason?: string
}

class Document_verification{
    passport: string;
    utility_bill: string;
}



/**
 * 
 * status: complete/ failed/ unknown 
 * (unknown will handle if "in progress/ pending" comes in)
 * 
 * identity_verification: verified/ unverified
 * risk_assessment: low/ medium/ high
 * address_verification: confirmed/ unconfirmed
 * 
 */