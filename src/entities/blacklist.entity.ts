import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import { User } from './user.entity';

@Entity()
@Unique(['pan'])
export class Blacklist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // One-to-One relationship with user
  @OneToOne(() => User, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'user_id' })
  user?: User;

  // Blacklisting by a PAN ID
  @Column()
  pan: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
