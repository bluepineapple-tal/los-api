import { ProductCategory } from 'src/products/product-categories/product-category.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { LoanOffer } from '../loan-offers/loan-offer.entity';
import { ConsumerDetails } from '../users/consumer.entity';

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

  @ManyToOne(() => ConsumerDetails, { onDelete: 'CASCADE' })
  consumer: ConsumerDetails;

  /**
   * Many‑to‑one link to ProductCategory.
   * Each application must pick exactly one category.
   */
  @ManyToOne(() => ProductCategory, { nullable: false, cascade: false })
  @JoinColumn({ name: 'product_category_id' })
  productCategory: ProductCategory;

  @ManyToOne(() => LoanOffer, { onDelete: 'CASCADE', nullable: true })
  selectedOffer?: LoanOffer;

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
  underwriter?: User;

  @Column({ default: false })
  manual_review_needed: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
