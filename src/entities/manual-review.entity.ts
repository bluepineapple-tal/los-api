import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LoanApplication } from './loan-application.entity';
import { User } from './user.entity';

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
