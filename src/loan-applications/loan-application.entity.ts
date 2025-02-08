import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { LoanOffer } from '../loan-offers/loan-offer.entity';
import { Product } from '../products/product.entity';
import { Consumer } from '../users/consumer.entity';
import { User } from './user.entity';

export enum ApplicationStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  UNDER_REVIEW = 'under_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  ESCALATED = 'escalated',
}

@Entity()
export class LoanApplication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Consumer, { onDelete: 'CASCADE' })
  consumer: Consumer;

  @ManyToOne(() => Product, { onDelete: 'CASCADE', nullable: false })
  product: Product;

  @ManyToOne(() => LoanOffer, { onDelete: 'CASCADE', nullable: false })
  loan_offer: LoanOffer;

  @Column({ type: 'timestamp' })
  application_date: Date;

  @Column({
    type: 'enum',
    enum: ApplicationStatus,
    default: ApplicationStatus.DRAFT,
  })
  status: ApplicationStatus;

  @Column('decimal', { precision: 12, scale: 2, nullable: true })
  requested_amount?: number;

  @ManyToOne(() => User, (user) => user.underwrittenApplications, {
    nullable: true,
  })
  underwriter?: User; // assigned underwriter

  @Column({ default: false })
  manual_review_needed: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
