import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ProductModel } from 'src/products/product-model/product-model.entity';

@Entity()
export class LoanOffer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ProductModel, (productModel) => productModel.loanOffers, {
    onDelete: 'CASCADE',
  })
  productModel: ProductModel;

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
