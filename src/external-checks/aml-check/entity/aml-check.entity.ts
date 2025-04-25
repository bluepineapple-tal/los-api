import { Type } from "class-transformer";
import { IsArray, IsDate, IsEnum, IsInt, IsNumber, IsString, ValidateNested } from "class-validator";
import { UUID } from "crypto";

export enum Status {
    COMPLETED = 'completed',
    FAILED = 'failed',
    UNKOWN = 'unknown'
}

export enum RiskAssessment {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high'
}

class PepCheck {
    @IsString() status: string;
    @IsArray() details: any[];
}

export class SanctionsCheck {
    @IsString() status: string;
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => MatchedEntity) matched_entities: MatchedEntity[];
}

export class MatchedEntity {
    @IsString() name?: string;
    @IsString() sanctions_list?: string;
    @IsString() watchlist_name?: string;
    @IsInt() match_confidence?: number;
    @IsString() title?: string;
    @IsString() source?: string;
    @IsString() date?: string;
}

class WatchlistCheck {
    @IsString() status: string;
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => MatchedEntity) matched_entities: MatchedEntity[];
}

class AdverseMediaCheck {
    @IsString() status: string;
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => MatchedEntity) matched_entities: MatchedEntity[];
}

export class TransactionRiskAssessment{
    @IsString() transaction_id: string;
    @IsNumber() risk_score: number;
    @IsEnum(RiskAssessment) risk_category: RiskAssessment;
    @IsString() flags: string[];
}

export class CustomerRiskAssessment {
    @IsNumber() risk_score: number;
    @IsEnum(RiskAssessment) risk_category: RiskAssessment;
    @Type(() => PepCheck) pep_check: PepCheck;
    @Type(() => SanctionsCheck) sanctions_check: SanctionsCheck;
    @Type(() => WatchlistCheck) watchlist_check: WatchlistCheck;
    @Type(() => AdverseMediaCheck) adverse_media_check: AdverseMediaCheck;
}

export class AmlCheckResponse {
    response_id: UUID;
    @IsString() request_id: string;
    @IsDate() timestamp: Date;
    @IsEnum(Status) status: Status;
    @Type(() => CustomerRiskAssessment) customer_risk_assessment: CustomerRiskAssessment;
    @IsArray() @ValidateNested({ each: true }) @Type(() => TransactionRiskAssessment)
    @Type(() => TransactionRiskAssessment) transaction_risk_assessment: TransactionRiskAssessment[];
    @IsString() recommendation: string;
    @IsString() comments?: string;
    error_code?: string;
    error_message?: string;
}