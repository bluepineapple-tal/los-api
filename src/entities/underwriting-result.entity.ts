import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UnderwritingRule } from './underwriting-rule.entity';
import { LoanApplication } from './loan-application.entity';

export enum Decision {
  APPROVE = 'approve',
  REJECT = 'reject',
  ESCALATE = 'escalate',
}

@Entity()
export class UnderwritingResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => LoanApplication, { onDelete: 'CASCADE' })
  loan_application: LoanApplication;

  @ManyToOne(() => UnderwritingRule, { onDelete: 'CASCADE' })
  rule: UnderwritingRule;

  @Column({ type: 'enum', enum: Decision })
  decision: Decision;

  @Column('text', { nullable: true })
  reason?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
