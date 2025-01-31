import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { LoanApplication } from './loan-application.entity';

@Entity('credit_assessments')
export class CreditAssessment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'pending' })
  status: string;

  @Column({ type: 'text', nullable: true })
  assessmentNotes: string;

  @OneToOne(
    () => LoanApplication,
    (loanApplication) => loanApplication.creditAssessment,
  )
  loanApplication: LoanApplication;
}
