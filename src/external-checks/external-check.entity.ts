import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { LoanApplication } from '../loan-applications/loan-application.entity';
import { AmlCheckResponse } from './aml-check/dtos/aml-check.response';
import { CreditCheckResponse } from './credit-check/dtos/credit-check.response';
import { KycCheckResponse } from './kyc-check/dtos/kyc-check.response';

export enum CheckType {
  CREDIT = 'CREDIT',
  KYC = 'KYC',
  AML = 'AML',
}

export enum CheckStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
}

@Entity()
export class ExternalCheck {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => LoanApplication, { onDelete: 'CASCADE' })
  loan_application: LoanApplication;

  @Column({ type: 'enum', enum: CheckType })
  check_type: CheckType;

  @Column({ type: 'varchar', length: 50 })
  check_status: string;

  // full raw JSON – helps with audit / debugging
  @Column('jsonb')
  response_data?: unknown;

  @CreateDateColumn()
  requested_at: Date;

  @Column({ nullable: true })
  responded_at?: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  static fromKyc(app: LoanApplication, resp: KycCheckResponse): ExternalCheck {
    return {
      loan_application: app,
      check_type: CheckType.KYC,
      check_status: resp.status,
      response_data: resp,
      responded_at: new Date(resp.timestamp),
    } as ExternalCheck;
  }

  static fromAml(app: LoanApplication, resp: AmlCheckResponse): ExternalCheck {
    return {
      loan_application: app,
      check_type: CheckType.AML,
      check_status: resp.status,
      response_data: resp,
      responded_at: new Date(resp.timestamp),
    } as ExternalCheck;
  }

  static fromCredit(
    app: LoanApplication,
    resp: CreditCheckResponse,
  ): ExternalCheck {
    return {
      loan_application: app,
      check_type: CheckType.CREDIT,
      check_status: String(resp.score_band),
      response_data: resp,
      responded_at: new Date(resp.timestamp),
    } as ExternalCheck;
  }
}
