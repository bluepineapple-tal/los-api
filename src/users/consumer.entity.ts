import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from './user.entity';
import { Gender, MaritalStatus } from './user.enums';

@Entity()
export class ConsumerDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (u) => u.consumerProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  /* --- ONLY consumer-specific fields below --- */
  @Column({ nullable: true })
  date_of_birth?: Date;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender?: Gender;

  @Column({ type: 'enum', enum: MaritalStatus, nullable: true })
  marital_status?: MaritalStatus;

  @Column({ nullable: true })
  alt_phone?: string;

  /* address as embeddable */
  @Column() street1: string;
  @Column({ nullable: true }) street2?: string;
  @Column() city: string;
  @Column() state: string;
  @Column() pin_code: string;
  @Column({ default: 'India' }) country: string;

  @Column({ unique: true, nullable: true })
  aadhar_number?: string;

  @Column({ unique: true, nullable: true })
  pan_number?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

@Entity()
export class ConsumerKyc {
  @PrimaryGeneratedColumn('uuid') id: string;

  @OneToOne(() => ConsumerDetails, (c) => c.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  consumer: ConsumerDetails;

  @Column() aadhar_path: string; // s3://bucket/key
  @Column() pan_path: string;
}
// TODO: Hook the upload in a Nest interceptor or service that receives multipart/form-data, uploads to storage, then writes the paths.
