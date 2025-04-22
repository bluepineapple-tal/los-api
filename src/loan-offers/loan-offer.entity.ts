import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * A loan offer template.  Can optionally be tied to a product‑model for
 * backwards‑compatibility, but the field is now nullable so offers can be
 * entirely product‑agnostic.
 */
@Entity()
export class LoanOffer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /* ───────────────────────────────  PRICING  ──────────────────────────────── */
  @Column('decimal', { precision: 5, scale: 2 })
  interest_rate: number;

  @Column()
  tenure_months: number;

  @Column('decimal', { precision: 10, scale: 2 })
  processing_fee: number;

  /* ─────────────────────  NEW AMOUNT & DATE RANGES  ──────────────────────── */
  @Column('decimal', { precision: 12, scale: 2 })
  min_amount: number;

  @Column('decimal', { precision: 12, scale: 2 })
  max_amount: number;

  @Column({
    type: 'date',
    transformer: {
      to: (value: Date) => value, // when saving, pass the JS Date through
      from: (value: string) => new Date(value), // when loading, convert the YYYY-MM-DD string
    },
  })
  valid_from: Date;

  @Column({
    type: 'date',
    transformer: {
      to: (value: Date) => value,
      from: (value: string) => new Date(value),
    },
  })
  valid_to: Date;

  /* ──────────────────────────  METADATA  ──────────────────────────────────── */
  @Column()
  offer_name: string;

  @Column('text', { nullable: true })
  offer_details?: string;

  @Column({ default: true })
  is_active: boolean;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  created_by?: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
