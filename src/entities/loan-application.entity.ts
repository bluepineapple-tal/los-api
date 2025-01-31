import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CreditAssessment } from './credit-assessment.entity';
import { User } from './user.entity';

@Entity('loan_applications')
export class LoanApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  loanAmount: number;

  @Column({ type: 'date' })
  applicationDate: Date;

  @Column({ default: 'pending' })
  status: string;

  @ManyToOne(() => User, (user) => user.loanApplications)
  user: User;

  @OneToOne(
    () => CreditAssessment,
    (creditAssessment) => creditAssessment.loanApplication,
  )
  @JoinColumn()
  creditAssessment: CreditAssessment;
}
