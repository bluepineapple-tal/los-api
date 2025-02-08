import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UnderwritingResult } from '../results/underwriting-result.entity';

@Entity()
export class UnderwritingRule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  rule_name: string;

  @Column('text')
  rule_desc: string;

  @Column('text')
  conditions: string; // store as JSON or DSL

  @Column()
  action: string; // e.g., "approve", "reject", "escalate"

  @Column()
  priority: number;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => UnderwritingResult, (res) => res.rule)
  results: UnderwritingResult[];
}
