import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LoanApplication } from './loan-application.entity';

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

  @Column({ type: 'enum', enum: CheckStatus, default: CheckStatus.PENDING })
  check_status: CheckStatus;

  @Column('text', { nullable: true })
  response_data?: string;

  @CreateDateColumn()
  requested_at: Date;

  @Column({ nullable: true })
  responded_at?: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
