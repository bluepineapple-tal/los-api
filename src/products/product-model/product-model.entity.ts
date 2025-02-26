import { LoanOffer } from 'src/loan-offers/loan-offer.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ProductMake } from '../product-make/product-make.entity';
import { ProductStatus } from '../products.enum';

@Entity()
export class ProductModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  // Relationships
  @OneToMany(() => LoanOffer, (offer) => offer.productModel)
  loanOffers: LoanOffer[];

  @ManyToOne(() => ProductMake, (make) => make.models, { eager: true })
  @JoinColumn({ name: 'make_id' })
  make: ProductMake;
}
