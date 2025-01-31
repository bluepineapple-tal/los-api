import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('underwriting_rules')
export class UnderwritingRule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ruleName: string;

  @Column()
  description: string;

  @Column()
  isStrict: boolean;
}
