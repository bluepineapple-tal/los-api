import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { LoanOffer } from '../loan-offers/loan-offer.entity';
import { Vendor } from '../users/vendor.entity';

export enum ProductStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DISCONTINUED = 'discontinued',
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Vendor, { onDelete: 'CASCADE' })
  vendor: Vendor;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 12, scale: 2 })
  price: number;

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.ACTIVE,
  })
  status: ProductStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relationship to Loan Offers
  @OneToMany(() => LoanOffer, (offer) => offer.product)
  loanOffers: LoanOffer[];
}
