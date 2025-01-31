import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { LoanApplication } from './loan-application.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @OneToMany(() => LoanApplication, (loanApplication) => loanApplication.user)
  loanApplications: LoanApplication[];
}
