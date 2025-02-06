import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { LoanApplication } from './loan-application.entity';
import { ApplicationStatus } from './loan-application.entity';
import { User } from './user.entity';

@Entity()
export class LoanApplicationHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => LoanApplication, { onDelete: 'CASCADE' })
  loan_application: LoanApplication;

  @Column({ type: 'enum', enum: ApplicationStatus })
  old_status: ApplicationStatus;

  @Column({ type: 'enum', enum: ApplicationStatus })
  new_status: ApplicationStatus;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  changed_by: User;

  @CreateDateColumn()
  changed_at: Date;

  @Column('text', { nullable: true })
  change_note?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
