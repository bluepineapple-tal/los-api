import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ApplicationStatus, LoanApplication } from '../loan-application.entity';

@Entity()
export class LoanApplicationHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => LoanApplication, { onDelete: 'CASCADE' })
  loan_application: LoanApplication;

  @Column({
    type: 'enum',
    enum: ApplicationStatus,
    enumName: 'application_status_enum',
  })
  old_status: ApplicationStatus;

  @Column({
    type: 'enum',
    enum: ApplicationStatus,
    enumName: 'application_status_enum',
  })
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
