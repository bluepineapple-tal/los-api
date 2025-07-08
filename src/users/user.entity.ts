import { LoanApplicationHistory } from 'src/loan-applications/loan-application-history/loan-application-history.entity';
import { LoanApplication } from 'src/loan-applications/loan-application.entity';
import { ManualReview } from 'src/underwriting/manual-reviews/manual-review.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ConsumerDetails } from './consumer.entity';
import { VendorDetails } from './vendor.entity';
import { UserRole, UserStatus } from './user.enums';

@Entity()
export class User {
  /* ------------- identities ------------- */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  supertokensUserId: string;

  @Column({ unique: true })
  email: string;

  /* ------------- common profile bits ------------- */
  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true, nullable: true })
  phone?: string;

  /* ------------- role & status ------------- */
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CONSUMER,
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

  /* ------------- housekeeping ------------- */
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  /* ------------- optional role-specific one-to-ones ------------- */
  @OneToOne(() => ConsumerDetails, (c) => c.user, { nullable: true })
  consumerProfile?: ConsumerDetails;

  @OneToOne(() => VendorDetails, (v) => v.user, { nullable: true })
  vendorProfile?: VendorDetails;

  // If the user is an underwriter, they might be assigned multiple applications
  @OneToMany(() => LoanApplication, (app) => app.underwriter, {
    nullable: true,
  })
  underwrittenApplications?: LoanApplication[];

  // If the user is an underwriter or admin, they might do many reviews
  @OneToMany(() => ManualReview, (mr) => mr.underwriter, { nullable: true })
  manualReviews?: ManualReview[];

  // If the user can change application statuses, they appear in history
  @OneToMany(() => LoanApplicationHistory, (hist) => hist.changed_by, {
    nullable: true,
  })
  applicationHistories?: LoanApplicationHistory[];
}
