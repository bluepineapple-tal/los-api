import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Product } from '../products/product.entity';
import { User } from './user.entity';

@Entity()
export class LoanOffer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.loanOffers, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @Column('decimal', { precision: 5, scale: 2 })
  interest_rate: number;

  @Column()
  tenure_months: number;

  @Column('decimal', { precision: 10, scale: 2 })
  processing_fee: number;

  @Column()
  offer_name: string;

  @Column('text', { nullable: true })
  offer_details?: string; // could store JSON

  @Column({ default: true })
  is_active: boolean;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  created_by: User; // The user who created the offer

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
