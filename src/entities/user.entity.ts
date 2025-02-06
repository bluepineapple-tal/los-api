import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Consumer } from './consumer.entity';
import { LoanApplicationHistory } from './loan-application-history.entity';
import { LoanApplication } from './loan-application.entity';
import { ManualReview } from './manual-review.entity';
import { Vendor } from './vendor.entity';

export enum UserRole {
  VENDOR = 'vendor',
  NBFC_PERSONNEL = 'nbfc_personnel',
  UNDERWRITER = 'underwriter',
  CONSUMER = 'consumer',
  ADMIN = 'admin',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password_hash: string;

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // -- OPTIONAL RELATIONSHIPS: If you want back references in the User entity.

  // One user can have exactly one vendor profile
  @OneToOne(() => Vendor, (vendor) => vendor.user, { nullable: true })
  vendor?: Vendor;

  // One user can have exactly one consumer profile
  @OneToOne(() => Consumer, (consumer) => consumer.user, { nullable: true })
  consumer?: Consumer;

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
