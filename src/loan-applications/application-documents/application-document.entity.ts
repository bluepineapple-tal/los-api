// entities/application-document.entity.ts

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { LoanApplication } from '../loan-application.entity';

export enum DocumentType {
  KYC = 'KYC',
  ID = 'ID',
  INCOME_PROOF = 'INCOME_PROOF',
}

export enum DocumentStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
}

@Entity()
export class ApplicationDocument {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => LoanApplication, { onDelete: 'CASCADE' })
  loan_application: LoanApplication;

  @Column({ type: 'enum', enum: DocumentType })
  doc_type: DocumentType;

  @Column()
  file_path: string;

  @CreateDateColumn()
  uploaded_at: Date;

  @Column({
    type: 'enum',
    enum: DocumentStatus,
    default: DocumentStatus.PENDING,
  })
  status: DocumentStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
