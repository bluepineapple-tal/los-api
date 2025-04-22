import { LoanApplication } from 'src/loan-applications/loan-application.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ProductCategoryStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity()
export class ProductCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: ProductCategoryStatus,
    default: ProductCategoryStatus.ACTIVE,
  })
  status: ProductCategoryStatus;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  // one‑to‑one ↔ loan application
  @OneToOne(() => LoanApplication, (app) => app.productCategory, {
    cascade: false,
  })
  loanApplication: LoanApplication;
}
