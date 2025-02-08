import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { LoanApplication } from '../../loan-applications/loan-application.entity';

export enum ReviewStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  ESCALATED = 'escalated',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity()
export class ManualReview {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => LoanApplication, { onDelete: 'CASCADE' })
  loan_application: LoanApplication;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  underwriter: User;

  @Column({ type: 'enum', enum: ReviewStatus, default: ReviewStatus.PENDING })
  review_status: ReviewStatus;

  @Column('text', { nullable: true })
  notes?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
